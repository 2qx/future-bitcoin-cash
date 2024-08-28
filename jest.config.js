export default {
  rootDir: "./",
  roots: [
    '<rootDir>/packages/contracts/',
    '<rootDir>/packages/lib/'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
        useESM: true,
      },
    ],
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  modulePathIgnorePatterns: ["dist"],
  verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  //testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: "<rootDir>/jest/setup.cjs",
  globalTeardown: "<rootDir>/jest/teardown.cjs",
};
