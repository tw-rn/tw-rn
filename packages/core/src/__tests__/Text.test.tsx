import React from "react";
import { render } from "@testing-library/react-native";
import { tw, Text } from "../";

describe("Text", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<Text testID="text" />);
    const { getProp } = getByTestId("text");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<Text testID="text" style={{}} />);

    const { getProp } = getByTestId("text");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <Text testID="text" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("text");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(<Text testID="text" style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]} />);

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<Text testID="text" style={tw`bg-white`} />);

    const { getProp } = getByTestId("text");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(<Text testID="text" style={[tw`bg-white`, { padding: 10 }]} />);

    const { getProp } = getByTestId("text");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
