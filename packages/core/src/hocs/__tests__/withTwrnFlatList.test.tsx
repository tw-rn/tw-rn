import React from "react";
import { FlatList as RnFlatList, Platform, FlatListProps } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrnFlatList from "../withTwrnFlatList";
import { tw } from "../../tw";
import { View } from "../..";

const FlatList = withTwrnFlatList(RnFlatList);

describe.only("withTwrnFlatList", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId } = render(
      <FlatList testID="flat-list" data={[]} renderItem={() => <View testID="view" />} />
    );

    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual(undefined);
    expect(getProp("contentContainerStyle")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(
      <FlatList
        testID="flat-list"
        style={{}}
        contentContainerStyle={{}}
        data={[]}
        renderItem={() => <View testID="view" />}
      />
    );

    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({});
    expect(getProp("contentContainerStyle")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <FlatList
        testID="flat-list"
        style={{ backgroundColor: "#ffffff" }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        data={[]}
        renderItem={() => <View testID="view" />}
      />
    );

    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <FlatList
        testID="flat-list"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        contentContainerStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        data={[]}
        renderItem={() => <View testID="view" />}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <FlatList
        testID="flat-list"
        style={tw`bg-white`}
        contentContainerStyle={tw`bg-white`}
        data={[]}
        renderItem={() => <View testID="view" />}
      />
    );

    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <FlatList
        testID="flat-list"
        style={[tw`bg-white`, { padding: 10 }]}
        contentContainerStyle={[tw`bg-white`, { padding: 10 }]}
        data={[]}
        renderItem={() => <View testID="view" />}
      />
    );

    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
