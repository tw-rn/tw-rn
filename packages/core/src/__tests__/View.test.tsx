import React from "react";
import { Platform } from "react-native";
import { render, fireEvent, NativeTestEvent, wait } from "@testing-library/react-native";
import { tw, View } from "../";

describe("View", () => {
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

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <View testID="view" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(<View testID="view" style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]} />);

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<View testID="view" style={tw`bg-white p-4`} />);

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
});
