#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { createPackageJson } = require('../lib/package-creator');
const { createReadme } = require('../lib/readme-creator');
const { createLicense } = require('../lib/license-creator');
const { createIndexJs } = require('../lib/index-creator');

const main = async () => {
  console.log(chalk.green('Welcome to the Node.js Package Creator!'));

  try {
    // Interactive CLI prompts to gather information for package creation
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'packageName',
        message: 'What is the name of your package?',
        validate: input => !!input || 'Package name cannot be empty.',
      },
      // Add more prompts as needed for README, LICENSE, etc.
    ]);

    // Using the gathered information to create files
    await createPackageJson(answers.packageName);
    await createReadme(answers.packageName);
    await createLicense(answers.packageName);
    await createIndexJs(answers.packageName);

    console.log(chalk.green('Your package files have been successfully created!'));
  } catch (error) {
    console.error(chalk.red('An error occurred while creating the package files:'), error);
  }
};

main();
