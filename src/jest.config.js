module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    setupFilesAfterEnv: ['./src/setupTests.js'],
    testEnvironment: 'jsdom', // Add this line
  };
  