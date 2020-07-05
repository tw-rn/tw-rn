import React from "react";
import { render } from "@testing-library/react-native";
import { tw, ActivityIndicator } from "../";

describe("ActivityIndicator", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<ActivityIndicator testID="ActivityIndicator" />);
    const { getProp } = getByTestId("ActivityIndicator");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<ActivityIndicator testID="ActivityIndicator" style={{}} />);

    const { getProp } = getByTestId("ActivityIndicator");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <ActivityIndicator testID="ActivityIndicator" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("ActivityIndicator");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <ActivityIndicator
        testID="ActivityIndicator"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <ActivityIndicator testID="ActivityIndicator" style={tw`bg-white`} />
    );

    const { getProp } = getByTestId("ActivityIndicator");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <ActivityIndicator testID="ActivityIndicator" style={[tw`bg-white`, { padding: 10 }]} />
    );

    const { getProp } = getByTestId("ActivityIndicator");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
