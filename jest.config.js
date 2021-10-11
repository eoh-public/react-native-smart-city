module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 77.54,
      branches: 67.53,
      functions: 71.31,
      lines: 78.04,
    },
  },
  modulePathIgnorePatterns: ['SampleProject'],
  coveragePathIgnorePatterns: ['/Images/', '/\\.json/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/libs/**',
    '!src/navigations/**',
    '!src/context/**',
  ],
  transformIgnorePatterns: ['node_modules/(?!react\b)\bw+\b'],
  setupFiles: [
    'dotenv/config',
    './jest/setup.js',
    './jest/react-native-reanimated.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['./jest/test-setup.js'],
  globalSetup: './jest/global-setup.js',
  testEnvironment: 'jsdom',
};
