module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 78.79,
      branches: 68.77,
      functions: 72.92,
      lines: 79.43,
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
