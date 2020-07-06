import React from "react";
import { render } from "@testing-library/react-native";
import { tw, Switch } from "..";

const switchSelfStyle = { height: 31, width: 51 };

// https://github.com/callstack/react-native-testing-library/issues/329
describe.skip("Switch", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<Switch testID="switch" />);
    const { getProp } = getByTestId("switch");

    expect(getProp("style")).toEqual(switchSelfStyle);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<Switch testID="switch" style={{}} />);

    const { getProp } = getByTestId("switch");

    expect(getProp("style")).toEqual([switchSelfStyle, {}]);
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <Switch testID="switch" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("switch");

    expect(getProp("style")).toEqual([switchSelfStyle, { backgroundColor: "#ffffff" }]);

    rerender(<Switch testID="switch" style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]} />);

    expect(getProp("style")).toEqual([
      switchSelfStyle,
      { backgroundColor: "#ffffff", padding: 10 },
    ]);
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<Switch testID="switch" style={tw`bg-white`} />);

    const { getProp } = getByTestId("switch");

    expect(getProp("style")).toEqual([switchSelfStyle, { backgroundColor: "#ffffff" }]);
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <Switch testID="switch" style={[tw`bg-white`, { padding: 10 }]} />
    );

    const { getProp } = getByTestId("switch");

    expect(getProp("style")).toEqual([
      switchSelfStyle,
      { backgroundColor: "#ffffff", padding: 10 },
    ]);
  });
});
