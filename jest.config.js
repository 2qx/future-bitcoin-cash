export default {
  rootDir: "./",
  roots: ['./dist-test'],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: "<rootDir>/jest/setup.cjs",
  globalTeardown: "<rootDir>/jest/teardown.cjs",
};
