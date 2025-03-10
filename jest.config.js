// module.exports = {
//   testEnvironment: 'node',
//   testMatch: ['**/src/**/*.test.ts'],
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//   },
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};