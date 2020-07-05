import React from "react";
import { Platform, Dimensions } from "react-native";
import { render, fireEvent, wait } from "@testing-library/react-native";
import { tw, View, TextInput } from "../";

describe("TextInput", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly the focus: pseudo selector", async () => {
    const handleOnFocus = jest.fn();
    const handleOnBlur = jest.fn();

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        style={tw`focus:bg-white`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

    const { getProp } = getByTestId("text-input");

    // Idle
    expect(getProp("style")).toEqual({});

    // Focus
    fireEvent.focus(getByTestId("text-input"));

    await wait(() => expect(handleOnFocus).toBeCalled());

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    // Blur
    fireEvent.blur(getByTestId("text-input"));

    await wait(() => expect(handleOnBlur).toBeCalled());

    expect(getProp("style")).toEqual({});
  });

  it("should render correctly the portrait: orientation pseudo selector", () => {
    (Dimensions.get as jest.Mock).mockImplementation(() => ({ height: 10, width: 5 }));

    const { getByTestId } = render(<View testID="view" style={tw`portrait:bg-white`} />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render correctly the landscape: orientation pseudo selector", () => {
    (Dimensions.get as jest.Mock).mockImplementation(() => ({ height: 5, width: 10 }));

    const { getByTestId } = render(<View testID="view" style={tw`landscape:bg-white`} />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  describe("ios", () => {
    beforeAll(() => {
      Platform.OS = "ios";
    });

    it("should not render media queries", () => {
      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      const { getProp } = getByTestId("view");

      expect(getProp("style")).toEqual({});
    });
  });

  describe("android", () => {
    beforeAll(() => {
      Platform.OS = "android";
    });

    it("should not render media queries on android", () => {
      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      const { getProp } = getByTestId("view");

      expect(getProp("style")).toEqual({});
    });
  });

  describe("web", () => {
    beforeAll(() => {
      Platform.OS = "web";
    });

    afterAll(() => {
      delete global.window;
    });

    beforeEach(() => {
      (global.window as any) = {
        matchMedia: jest.fn().mockImplementation(() => ({
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        })),
      };
    });

    it("should not render on SSR", () => {
      delete global.window;

      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      expect(() => getByTestId("view")).toThrow();
    });

    it("should render media queries on web", () => {
      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      const { getProp } = getByTestId("view");

      expect(getProp("style")).toEqual({ backgroundColor: "#ff0000" });
    });

    it("should render non media queries styles along media queries styles", () => {
      const { getByTestId } = render(<View testID="view" style={tw`p-1 sm:bg-red`} />);

      const { getProp } = getByTestId("view");

      expect(getProp("style")).toEqual({ padding: 4, backgroundColor: "#ff0000" });
    });

    it("should respect queries order styles", () => {
      const { getByTestId } = render(<View testID="view" style={tw`p-1 sm:bg-red md:bg-green`} />);

      const { getProp } = getByTestId("view");

      expect(getProp("style")).toEqual({ padding: 4, backgroundColor: "#00ff00" });
    });
  });
});
