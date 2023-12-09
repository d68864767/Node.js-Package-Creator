const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const createLicense = async () => {
  console.log(chalk.green('Starting LICENSE file creation process...'));

  // Define questions for inquirer prompt
  const questions = [
    {
      type: 'list',
      name: 'licenseType',
      message: 'Choose a license for your project:',
      choices: [
        'MIT',
        'GNU GPLv3',
        'Apache License 2.0',
        'BSD 3-Clause "New" or "Revised" license',
        'None'
      ],
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'fullName',
      message: 'Your full name:',
      validate: input => !!input || 'Full name cannot be empty.'
    },
    {
      type: 'input',
      name: 'year',
      message: 'Year:',
      default: new Date().getFullYear().toString()
    }
  ];

  // Prompt user for license details
  const answers = await inquirer.prompt(questions);

  // License text templates
  const licenseTemplates = {
    'MIT': `MIT License

Copyright (c) ${answers.year} ${answers.fullName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    'GNU GPLv3': `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) ${answers.year} ${answers.fullName}

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

[... full GNU GPLv3 text ...]`,
    // Add other licenses here as needed
    'None': ''
  };

  // Select the appropriate license text
  const licenseText = licenseTemplates[answers.licenseType];

  // Write LICENSE to the file system
  fs.writeFile('LICENSE', licenseText, (err) => {
    if (err) {
      console.error(chalk.red('Error writing LICENSE file:', err));
    } else {
      console.log(chalk.green('LICENSE file created successfully.'));
    }
  });
};

module.exports = {
  createLicense
};
