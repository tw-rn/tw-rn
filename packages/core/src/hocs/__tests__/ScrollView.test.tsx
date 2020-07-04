import React from "react";
import { ScrollView as RnScrollView, Platform, ScrollViewProps } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrn from "../withTwrn";
import { tw } from "../../tw";

const ScrollView = withTwrn<ScrollViewProps, "style" | "contentContainerStyle">(RnScrollView, [
  "style",
  "contentContainerStyle",
]);

describe.only("ScrollView", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<ScrollView testID="scroll-view" />);

    const { getProp } = getByTestId("scroll-view");

    expect(getProp("style")).toEqual(undefined);
    expect(getProp("contentContainerStyle")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <ScrollView testID="scroll-view" style={{}} contentContainerStyle={{}} />
    );

    const { getProp } = getByTestId("scroll-view");

    expect(getProp("style")).toEqual({});
    expect(getProp("contentContainerStyle")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <ScrollView
        testID="scroll-view"
        style={{ backgroundColor: "#ffffff" }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
      />
    );

    const { getProp } = getByTestId("scroll-view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <ScrollView
        testID="scroll-view"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        contentContainerStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <ScrollView testID="scroll-view" style={tw`bg-white`} contentContainerStyle={tw`bg-white`} />
    );

    const { getProp } = getByTestId("scroll-view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <ScrollView
        testID="scroll-view"
        style={[tw`bg-white`, { padding: 10 }]}
        contentContainerStyle={[tw`bg-white`, { padding: 10 }]}
      />
    );

    const { getProp } = getByTestId("scroll-view");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
