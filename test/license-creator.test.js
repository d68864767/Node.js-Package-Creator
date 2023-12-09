const { createLicense } = require('../lib/license-creator');
const fs = require('fs');
const inquirer = require('inquirer');

jest.mock('fs');
jest.mock('inquirer');

describe('License Creator', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should create a MIT license file with the correct content', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({
      licenseType: 'MIT',
      fullName: 'John Doe',
      year: '2023'
    });

    const mitLicenseText = `MIT License

Copyright (c) ${'2023'} ${'John Doe'}

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
SOFTWARE.`;

    await createLicense();

    expect(fs.writeFile).toHaveBeenCalledWith('LICENSE', mitLicenseText, expect.any(Function));
  });

  it('should handle errors when writing the LICENSE file', async () => {
    const errorMessage = 'Error writing LICENSE file';
    fs.writeFile = jest.fn((path, data, callback) => callback(new Error(errorMessage)));

    inquirer.prompt = jest.fn().mockResolvedValue({
      licenseType: 'MIT',
      fullName: 'John Doe',
      year: '2023'
    });

    await createLicense();

    expect(fs.writeFile).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
  });

  // Additional tests for other license types and scenarios can be added here
});
