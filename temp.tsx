module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native)/)', // allow react-native to be transformed
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web', // simple workaround
  }
};