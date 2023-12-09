const fs = require('fs');
const chalk = require('chalk');

/**
 * Creates an index.js file with a basic structure.
 * @param {string} packageName - The name of the package for which to create the index.js file.
 */
const createIndexJs = async (packageName) => {
  console.log(chalk.green('Starting index.js creation process...'));

  // Basic content for the index.js file
  const content = `// Entry point for the ${packageName} package

module.exports = {
  // Export functions, objects, or constants
};
`;

  try {
    // Write the index.js file to the file system
    fs.writeFileSync('index.js', content);
    console.log(chalk.green('index.js file created successfully.'));
  } catch (error) {
    console.error(chalk.red('An error occurred while creating the index.js file:'), error);
    throw error;
  }
};

module.exports = {
  createIndexJs
};
