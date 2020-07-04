import React from "react";
import { View as RnView, TextInput as RnTextInput, Platform, Dimensions } from "react-native";
import { render, fireEvent, NativeTestEvent, wait, toJSON } from "@testing-library/react-native";
import withTwrn from "../withTwrnBasicComponent";
import { tw } from "../../tw";

const View = withTwrn(RnView);
const TextInput = withTwrn(RnTextInput);

describe("withTwrn", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<View testID="view" />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<View testID="view" style={{}} />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({});
  });

  it.only("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <View testID="view" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(<View testID="view" style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]} />);

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<View testID="view" style={tw`bg-white`} />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(<View testID="view" style={[tw`bg-white`, { padding: 10 }]} />);

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render correctly the hover: pseudo selector", async () => {
    const handleOnMouseEnter = jest.fn();
    const handleOnMouseLeave = jest.fn();

    const { getByTestId, asJSON, rerender } = render(
      <View
        testID="view"
        style={tw`hover:bg-white`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    );

    const { getProp } = getByTestId("view");

    // Idle
    expect(getProp("style")).toEqual({});

    // Hover
    fireEvent(getByTestId("view"), new NativeTestEvent("mouseEnter", { nativeEvent: {} }));

    await wait(() => expect(handleOnMouseEnter).toBeCalled());

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    // No hover
    fireEvent(getByTestId("view"), new NativeTestEvent("mouseLeave", { nativeEvent: {} }));

    await wait(() => expect(handleOnMouseLeave).toBeCalled());

    expect(getProp("style")).toEqual({});
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
