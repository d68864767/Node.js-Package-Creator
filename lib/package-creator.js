const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const createPackageJson = async () => {
  console.log(chalk.green('Starting package.json creation process...'));

  // Define questions for inquirer prompt
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Package name:',
      validate: input => !!input || 'Package name cannot be empty.'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:'
    },
    {
      type: 'input',
      name: 'entryPoint',
      message: 'Entry point:',
      default: 'index.js'
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Git repository:'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License:',
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords (comma separated):'
    }
  ];

  // Prompt user for package details
  const answers = await inquirer.prompt(questions);

  // Convert comma separated keywords to an array
  const keywordsArray = answers.keywords.split(',').map(keyword => keyword.trim());

  // Create package.json content
  const packageJsonContent = {
    name: answers.name,
    version: answers.version,
    description: answers.description,
    main: answers.entryPoint,
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    repository: {
      type: 'git',
      url: answers.repository
    },
    keywords: keywordsArray,
    author: answers.author,
    license: answers.license,
    bugs: {
      url: `${answers.repository}/issues`
    },
    homepage: `${answers.repository}#readme`,
    dependencies: {},
    devDependencies: {}
  };

  // Write package.json to the file system
  fs.writeFile('package.json', JSON.stringify(packageJsonContent, null, 2), (err) => {
    if (err) {
      console.error(chalk.red('Error writing package.json file:', err));
    } else {
      console.log(chalk.green('package.json file created successfully.'));
    }
  });
};

module.exports = {
  createPackageJson
};
