import React from "react";
import { render } from "@testing-library/react-native";
import { tw, KeyboardAvoidingView } from "../";

describe("KeyboardAvoidingView", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<KeyboardAvoidingView testID="KeyboardAvoidingView" />);
    const { getProp } = getByTestId("KeyboardAvoidingView");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <KeyboardAvoidingView testID="KeyboardAvoidingView" style={{}} />
    );

    const { getProp } = getByTestId("KeyboardAvoidingView");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <KeyboardAvoidingView testID="KeyboardAvoidingView" style={{ backgroundColor: "#ffffff" }} />
    );

    const { getProp } = getByTestId("KeyboardAvoidingView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <KeyboardAvoidingView
        testID="KeyboardAvoidingView"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <KeyboardAvoidingView testID="KeyboardAvoidingView" style={tw`bg-white`} />
    );

    const { getProp } = getByTestId("KeyboardAvoidingView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <KeyboardAvoidingView testID="KeyboardAvoidingView" style={[tw`bg-white`, { padding: 10 }]} />
    );

    const { getProp } = getByTestId("KeyboardAvoidingView");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
