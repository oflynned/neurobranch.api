module.exports = {
  projects: [
    '<rootDir>/apps/core/src',
    '<rootDir>/libs/common/src',
    '<rootDir>/libs/config/src',
    '<rootDir>/libs/firebase/src',
    '<rootDir>/libs/graphql/src',
    '<rootDir>/libs/cache/src',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/index.ts',
    '!**/*.module.ts',
    '!**/migrations/*',
    '!**/main.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
