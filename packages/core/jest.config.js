const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "react-native",
  transform: {
    ...tsjPreset.transform,
    "\\.js$": "<rootDir>/../../node_modules/react-native/jest/preprocessor.js",
  },
  cacheDirectory: ".jest/cache",
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/react-native/cleanup-after-each"],
  globals: {
    __TW_RN_STYLES__: require("./src/__mocks__/styles"),
  },
};
