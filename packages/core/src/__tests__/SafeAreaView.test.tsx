import React from "react";
import { render } from "@testing-library/react-native";
import { tw, SafeAreaView } from "..";

describe("SafeAreaView", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<SafeAreaView testID="SafeAreaView" />);
    const { getProp } = getByTestId("SafeAreaView");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<SafeAreaView testID="SafeAreaView" style={{}} />);

    const { getProp } = getByTestId("SafeAreaView");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <SafeAreaView testID="SafeAreaView" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("SafeAreaView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <SafeAreaView
        testID="SafeAreaView"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<SafeAreaView testID="SafeAreaView" style={tw`bg-white`} />);

    const { getProp } = getByTestId("SafeAreaView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <SafeAreaView testID="SafeAreaView" style={[tw`bg-white`, { padding: 10 }]} />
    );

    const { getProp } = getByTestId("SafeAreaView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
