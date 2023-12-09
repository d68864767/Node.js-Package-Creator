const { createPackageJson } = require('../lib/package-creator');
const fs = require('fs');
const inquirer = require('inquirer');

jest.mock('fs');
jest.mock('inquirer');

describe('Package Creator', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should create a package.json file with the correct content', async () => {
    // Mock inquirer responses
    inquirer.prompt = jest.fn().mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      entryPoint: 'index.js',
      repository: 'https://github.com/user/test-package',
      author: 'Test User',
      license: 'MIT',
      keywords: 'test,package'
    });

    // Mock fs.writeFile implementation
    fs.writeFile = jest.fn((path, data, callback) => {
      callback(null);
    });

    await createPackageJson();

    // Check if inquirer.prompt was called
    expect(inquirer.prompt).toHaveBeenCalled();

    // Check if fs.writeFile was called
    expect(fs.writeFile).toHaveBeenCalled();

    // Check if fs.writeFile was called with the correct arguments
    const expectedPackageJsonContent = JSON.stringify({
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      repository: {
        type: 'git',
        url: 'https://github.com/user/test-package'
      },
      keywords: ['test', 'package'],
      author: 'Test User',
      license: 'MIT',
      bugs: {
        url: 'https://github.com/user/test-package/issues'
      },
      homepage: 'https://github.com/user/test-package#readme',
      dependencies: {},
      devDependencies: {}
    }, null, 2);

    expect(fs.writeFile).toHaveBeenCalledWith('package.json', expectedPackageJsonContent, expect.any(Function));
  });

  it('should handle errors when writing the package.json file', async () => {
    // Mock inquirer responses
    inquirer.prompt = jest.fn().mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      entryPoint: 'index.js',
      repository: 'https://github.com/user/test-package',
      author: 'Test User',
      license: 'MIT',
      keywords: 'test,package'
    });

    // Mock fs.writeFile implementation to simulate an error
    const testError = new Error('Test Error');
    fs.writeFile = jest.fn((path, data, callback) => {
      callback(testError);
    });

    console.error = jest.fn(); // Mock console.error to suppress error logs

    await createPackageJson();

    // Check if console.error was called with the error
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error writing package.json file:'), testError);
  });
});
