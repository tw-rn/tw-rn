import React from "react";
import { View as RnView, TextInput as RnTextInput, Platform } from "react-native";
import { render, fireEvent, NativeTestEvent, wait, toJSON } from "@testing-library/react-native";
import withTwrn from "../withTwrn";
import { tw } from "../tw";

const View = withTwrn(RnView);
const TextInput = withTwrn(RnTextInput);

describe("withTwrn", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<View testID="view" />);
    expect(toJSON(getByTestId("view"))).toMatchSnapshot();
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <View testID="view" style={{ backgroundColor: "#ff0000" }} />
    );

    expect(toJSON(getByTestId("view"))).toMatchSnapshot();

    rerender(<View testID="view" style={[{ backgroundColor: "#ff0000" }, { padding: 10 }]} />);

    expect(toJSON(getByTestId("view"))).toMatchSnapshot();
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<View testID="view" style={tw`bg-white`} />);

    expect(toJSON(getByTestId("view"))).toMatchSnapshot();
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(<View testID="view" style={[tw`bg-white`, { padding: 10 }]} />);

    expect(toJSON(getByTestId("view"))).toMatchSnapshot();
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

    // Idle
    expect(toJSON(getByTestId("view"))).toMatchSnapshot("hover: - idle");

    // Hover
    fireEvent(getByTestId("view"), new NativeTestEvent("mouseEnter", { nativeEvent: {} }));

    await wait(() => expect(handleOnMouseEnter).toBeCalled());

    rerender(
      <View
        testID="view"
        style={tw`hover:bg-white`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    );

    expect(toJSON(getByTestId("view"))).toMatchSnapshot("hover: - hovered");

    // No hover
    fireEvent(getByTestId("view"), new NativeTestEvent("mouseLeave", { nativeEvent: {} }));

    await wait(() => expect(handleOnMouseLeave).toBeCalled());

    rerender(
      <View
        testID="view"
        style={tw`hover:bg-white`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    );

    expect(toJSON(getByTestId("view"))).toMatchSnapshot("hover: - no-hover");
  });

  it("should render correctly the focus: pseudo selector", async () => {
    const handleOnFocus = jest.fn();
    const handleOnBlur = jest.fn();

    const { getByTestId, asJSON, rerender } = render(
      <TextInput
        testID="text-input"
        style={tw`focus:bg-white`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

    // Idle
    expect(toJSON(getByTestId("text-input"))).toMatchSnapshot("focus: - idle");

    // Focus
    fireEvent.focus(getByTestId("text-input"));

    await wait(() => expect(handleOnFocus).toBeCalled());

    rerender(
      <TextInput
        testID="text-input"
        style={tw`focus:bg-white`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

    expect(toJSON(getByTestId("text-input"))).toMatchSnapshot("focus: - focused");

    // Blur
    fireEvent.blur(getByTestId("text-input"));

    await wait(() => expect(handleOnBlur).toBeCalled());

    rerender(
      <TextInput
        testID="text-input"
        style={tw`focus:bg-white`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

    expect(toJSON(getByTestId("text-input"))).toMatchSnapshot("focus: - blurred");
  });

  describe("ios", () => {
    beforeAll(() => {
      Platform.OS = "ios";
    });

    it("should not render media queries", () => {
      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      expect(toJSON(getByTestId("view"))).toMatchSnapshot();
    });
  });

  describe("android", () => {
    beforeAll(() => {
      Platform.OS = "android";
    });

    it("should not render media queries on android", () => {
      const { asJSON } = render(<View testID="view" style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
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

      const { asJSON } = render(<View testID="view" style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });

    it("should render media queries on web", () => {
      const { getByTestId } = render(<View testID="view" style={tw`sm:bg-red`} />);

      expect(toJSON(getByTestId("view"))).toMatchSnapshot();
    });

    it("should render non media queries styles along media queries styles", () => {
      const { getByTestId } = render(<View testID="view" style={tw`p-1 sm:bg-red`} />);

      expect(toJSON(getByTestId("view"))).toMatchSnapshot();
    });

    it("should respect queries order styles", () => {
      const { getByTestId } = render(<View testID="view" style={tw`p-1 sm:bg-red md:bg-green`} />);

      expect(toJSON(getByTestId("view"))).toMatchSnapshot();
    });
  });
});
