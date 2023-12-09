const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const createReadme = async () => {
  console.log(chalk.green('Starting README.md creation process...'));

  // Define questions for inquirer prompt
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: input => !!input || 'Project name cannot be empty.'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      validate: input => !!input || 'Project description cannot be empty.'
    },
    {
      type: 'input',
      name: 'installationInstructions',
      message: 'Installation instructions:',
      default: 'npm install <package-name>'
    },
    {
      type: 'input',
      name: 'usageInstructions',
      message: 'Usage instructions:',
      default: 'npm start'
    },
    {
      type: 'input',
      name: 'contributionGuidelines',
      message: 'Contribution guidelines:',
      default: 'Please read CONTRIBUTING.md'
    },
    {
      type: 'input',
      name: 'testInstructions',
      message: 'Test instructions:',
      default: 'npm test'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License:',
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Your GitHub username:',
      validate: input => !!input || 'GitHub username cannot be empty.'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Your email address:',
      validate: input => !!input || 'Email address cannot be empty.'
    }
  ];

  // Prompt user for README details
  const answers = await inquirer.prompt(questions);

  // Create README content
  const readmeContent = `# ${answers.projectName}

${answers.description}

## Installation

\`\`\`sh
${answers.installationInstructions}
\`\`\`

## Usage

\`\`\`sh
${answers.usageInstructions}
\`\`\`

## Contributing

${answers.contributionGuidelines}

## Tests

\`\`\`sh
${answers.testInstructions}
\`\`\`

## License

This project is licensed under the ${answers.license} License.

## Questions

For any questions, please contact me at [${answers.email}](mailto:${answers.email}) or open an issue on [GitHub](https://github.com/${answers.githubUsername}/${answers.projectName}/issues).
`;

  // Write README.md to the file system
  fs.writeFile('README.md', readmeContent, (err) => {
    if (err) {
      console.error(chalk.red('Error writing README.md'), err);
    } else {
      console.log(chalk.green('README.md created successfully!'));
    }
  });
};

module.exports = createReadme;
