const fs = require('fs');
const { createIndexJs } = require('../lib/index-creator');
const chalk = require('chalk');

// Mock the console.log and console.error functions to prevent actual logging during tests
console.log = jest.fn();
console.error = jest.fn();

// Mock the 'chalk' module to prevent actual styling during tests
jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text)
}));

describe('Index Creator', () => {
  // Mock the 'fs' module to prevent actual file system operations during tests
  beforeEach(() => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an index.js file with the correct content', async () => {
    const packageName = 'test-package';
    const expectedContent = `// Entry point for the ${packageName} package

module.exports = {
  // Export functions, objects, or constants
};
`;

    await createIndexJs(packageName);

    // Check if the file was written with the correct content
    expect(fs.writeFileSync).toHaveBeenCalledWith('index.js', expectedContent);
    // Check if the success message was logged
    expect(console.log).toHaveBeenCalledWith('index.js file created successfully.');
  });

  it('should log an error if there is an issue creating the file', async () => {
    const errorMessage = 'An error occurred while creating the index.js file:';
    const packageName = 'test-package';
    const error = new Error('Test error');

    // Mock the 'fs.writeFileSync' to throw an error
    fs.writeFileSync.mockImplementation(() => {
      throw error;
    });

    await expect(createIndexJs(packageName)).rejects.toThrow(error);

    // Check if the error message was logged
    expect(console.error).toHaveBeenCalledWith(chalk.red(errorMessage), error);
  });
});
