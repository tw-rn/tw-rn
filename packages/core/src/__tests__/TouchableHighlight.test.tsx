import React from "react";
import { render } from "@testing-library/react-native";
import { tw, TouchableHighlight, View } from "..";

describe("TouchableHighlight", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(
      <TouchableHighlight testID="TouchableHighlight">
        <View />
      </TouchableHighlight>
    );
    const { getProp } = getByTestId("TouchableHighlight");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <TouchableHighlight testID="TouchableHighlight" style={{}}>
        <View />
      </TouchableHighlight>
    );

    const { getProp } = getByTestId("TouchableHighlight");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <TouchableHighlight testID="TouchableHighlight" style={{ backgroundColor: "#ffffff" }}>
        <View />
      </TouchableHighlight>
    );

    const { getProp } = getByTestId("TouchableHighlight");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <TouchableHighlight
        testID="TouchableHighlight"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      >
        <View />
      </TouchableHighlight>
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <TouchableHighlight testID="TouchableHighlight" style={tw`bg-white`}>
        <View />
      </TouchableHighlight>
    );

    const { getProp } = getByTestId("TouchableHighlight");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <TouchableHighlight testID="TouchableHighlight" style={[tw`bg-white`, { padding: 10 }]}>
        <View />
      </TouchableHighlight>
    );

    const { getProp } = getByTestId("TouchableHighlight");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
