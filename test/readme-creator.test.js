const fs = require('fs');
const inquirer = require('inquirer');
const createReadme = require('../lib/readme-creator');
const chalk = require('chalk');
const { promisify } = require('util');

// Mock inquirer to prevent it from prompting the user for input during tests
jest.mock('inquirer');

// Mock fs to prevent it from writing to the filesystem during tests
jest.mock('fs', () => ({
  writeFile: jest.fn((path, data, callback) => callback(null))
}));

// Mock chalk to prevent it from styling strings during tests
jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text)
}));

describe('readme-creator', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should create a README.md file with the correct content', async () => {
    // Mock inquirer responses
    const mockAnswers = {
      projectName: 'Test Project',
      description: 'A test project description',
      installationInstructions: 'npm install test-project',
      usageInstructions: 'npm start',
      contributionGuidelines: 'Please read CONTRIBUTING.md',
      testInstructions: 'npm test',
      license: 'MIT',
      githubUsername: 'testuser',
      email: 'test@example.com'
    };

    inquirer.prompt.mockResolvedValue(mockAnswers);

    // Convert writeFile to a promise to await it
    const writeFileAsync = promisify(fs.writeFile);

    // Call the createReadme function
    await createReadme();

    // Check if writeFile was called with the correct parameters
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(
      'README.md',
      expect.stringContaining(`# ${mockAnswers.projectName}`),
      expect.any(Function)
    );

    // Check if the content of README.md is as expected
    const expectedReadmeContent = `# ${mockAnswers.projectName}

${mockAnswers.description}

## Installation

\`\`\`sh
${mockAnswers.installationInstructions}
\`\`\`

## Usage

\`\`\`sh
${mockAnswers.usageInstructions}
\`\`\`

## Contributing

${mockAnswers.contributionGuidelines}

## Tests

\`\`\`sh
${mockAnswers.testInstructions}
\`\`\`

## License

This project is licensed under the ${mockAnswers.license} License.

## Questions

For any questions, please contact me at [${mockAnswers.email}](mailto:${mockAnswers.email}) or open an issue on [GitHub](https://github.com/${mockAnswers.githubUsername}/${mockAnswers.projectName}/issues).
`;

    // Check if the content written to README.md is correct
    const writtenContent = writeFileAsync.mock.calls[0][1];
    expect(writtenContent).toBe(expectedReadmeContent);

    // Check if console logs are correct
    expect(chalk.green).toHaveBeenCalledWith('Starting README.md creation process...');
    expect(chalk.green).toHaveBeenCalledWith('README.md created successfully!');
  });

  it('should handle errors when writing README.md file', async () => {
    // Mock inquirer responses
    const mockAnswers = {
      projectName: 'Test Project',
      description: 'A test project description',
      // ... other properties
    };

    inquirer.prompt.mockResolvedValue(mockAnswers);

    // Mock fs.writeFile to simulate an error
    const error = new Error('Failed to write to file');
    fs.writeFile.mockImplementation((path, data, callback) => callback(error));

    // Call the createReadme function and expect it to throw an error
    await expect(createReadme()).rejects.toThrow(error);

    // Check if the error console log is correct
    expect(chalk.red).toHaveBeenCalledWith('Error writing README.md', error);
  });
});
