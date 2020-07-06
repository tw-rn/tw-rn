import React from "react";
import { render } from "@testing-library/react-native";
import { tw, TouchableOpacity, View } from "..";

const touchableOpacityInitialStyle = { opacity: 1 };

describe("TouchableOpacity", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(
      <TouchableOpacity testID="TouchableOpacity">
        <View />
      </TouchableOpacity>
    );
    const { getProp } = getByTestId("TouchableOpacity");

    expect(getProp("style")).toEqual(touchableOpacityInitialStyle);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <TouchableOpacity testID="TouchableOpacity" style={{}}>
        <View />
      </TouchableOpacity>
    );

    const { getProp } = getByTestId("TouchableOpacity");

    expect(getProp("style")).toEqual(touchableOpacityInitialStyle);
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <TouchableOpacity testID="TouchableOpacity" style={{ backgroundColor: "#ffffff" }}>
        <View />
      </TouchableOpacity>
    );

    const { getProp } = getByTestId("TouchableOpacity");

    expect(getProp("style")).toEqual({
      backgroundColor: "#ffffff",
      ...touchableOpacityInitialStyle,
    });

    rerender(
      <TouchableOpacity
        testID="TouchableOpacity"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      >
        <View />
      </TouchableOpacity>
    );

    expect(getProp("style")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
      ...touchableOpacityInitialStyle,
    });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <TouchableOpacity testID="TouchableOpacity" style={tw`bg-white`}>
        <View />
      </TouchableOpacity>
    );

    const { getProp } = getByTestId("TouchableOpacity");

    expect(getProp("style")).toEqual({
      backgroundColor: "#ffffff",
      ...touchableOpacityInitialStyle,
    });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <TouchableOpacity testID="TouchableOpacity" style={[tw`bg-white`, { padding: 10 }]}>
        <View />
      </TouchableOpacity>
    );

    const { getProp } = getByTestId("TouchableOpacity");

    expect(getProp("style")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
      ...touchableOpacityInitialStyle,
    });
  });
});
