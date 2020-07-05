import React from "react";
import { SectionList as RnSectionList, Platform } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrnSectionList from "../withTwrnSectionList";
import { tw } from "../../tw";
import { View } from "../..";

const SectionList = withTwrnSectionList(RnSectionList);

describe.only("withTwrnSectionList", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId } = render(
      <SectionList
        testID="section-list"
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );
    const { getProp } = getByTestId("section-list");

    expect(getProp("style")).toEqual(undefined);
    expect(getProp("contentContainerStyle")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <SectionList
        testID="section-list"
        style={{}}
        contentContainerStyle={{}}
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("section-list");

    expect(getProp("style")).toEqual({});
    expect(getProp("contentContainerStyle")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <SectionList
        testID="section-list"
        style={{ backgroundColor: "#ffffff" }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("section-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <SectionList
        testID="section-list"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        contentContainerStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <SectionList
        testID="section-list"
        style={tw`bg-white`}
        contentContainerStyle={tw`bg-white`}
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("section-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <SectionList
        testID="section-list"
        style={[tw`bg-white`, { padding: 10 }]}
        contentContainerStyle={[tw`bg-white`, { padding: 10 }]}
        sections={[{ data: [1] }, { data: [2] }]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("section-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
