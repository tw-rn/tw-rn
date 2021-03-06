import { FRAME_TIME } from "./src/helpers/tests";

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: jest.fn((selector) => selector.ios),
}));

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  const originalModule = jest.requireActual("react-native/Libraries/Utilities/Dimensions");

  return {
    ...originalModule,
    get: jest.fn(() => ({ height: 10, width: 5 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, FRAME_TIME);
};
