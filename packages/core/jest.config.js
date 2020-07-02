const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    ...tsjPreset.transform,
    "\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  cacheDirectory: "<rootDir>/.jest/cache",
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/react-native/cleanup-after-each"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
    __TW_RN_STYLES__: require("./src/__mocks__/styles"),
  },
};
