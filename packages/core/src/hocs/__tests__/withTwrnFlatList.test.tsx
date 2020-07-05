import React from "react";
import { FlatList as RnFlatList, Platform } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrnFlatList from "../withTwrnFlatList";
import { tw } from "../../tw";
import { View } from "../..";

const FlatList = withTwrnFlatList(RnFlatList);

describe("withTwrnFlatList", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should render correctly with no styles", () => {
    const { getByTestId, getAllByTestId } = render(
      <FlatList
        testID="flat-list"
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const viewNode = getAllByTestId("view");
    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual(undefined);
    expect(getProp("contentContainerStyle")).toEqual(undefined);
    expect(getProp("ListFooterComponentStyle")).toEqual(undefined);
    expect(getProp("ListHeaderComponentStyle")).toEqual(undefined);
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).not.toContainEqual({});
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId, getAllByTestId, asJSON } = render(
      <FlatList
        testID="flat-list"
        style={{}}
        contentContainerStyle={{}}
        ListFooterComponentStyle={{}}
        ListHeaderComponentStyle={{}}
        columnWrapperStyle={{}}
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const viewNode = getAllByTestId("view");
    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({});
    expect(getProp("contentContainerStyle")).toEqual({});
    expect(getProp("ListFooterComponentStyle")).toEqual({});
    expect(getProp("ListHeaderComponentStyle")).toEqual({});
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).toContainEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender, getAllByTestId } = render(
      <FlatList
        testID="flat-list"
        style={{ backgroundColor: "#ffffff" }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        ListFooterComponentStyle={{ backgroundColor: "#ffffff" }}
        ListHeaderComponentStyle={{ backgroundColor: "#ffffff" }}
        columnWrapperStyle={{ backgroundColor: "#ffffff" }}
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const viewNode = getAllByTestId("view");
    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListFooterComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListHeaderComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).toContainEqual({ backgroundColor: "#ffffff" });

    rerender(
      <FlatList
        testID="flat-list"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        contentContainerStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        ListFooterComponentStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        ListHeaderComponentStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        columnWrapperStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("ListFooterComponentStyle")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
    expect(getProp("ListHeaderComponentStyle")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).toContainEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId, getAllByTestId } = render(
      <FlatList
        testID="flat-list"
        style={tw`bg-white`}
        contentContainerStyle={tw`bg-white`}
        ListFooterComponentStyle={tw`bg-white`}
        ListHeaderComponentStyle={tw`bg-white`}
        columnWrapperStyle={tw`bg-white`}
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const viewNode = getAllByTestId("view");
    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListFooterComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListHeaderComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).toContainEqual({
      backgroundColor: "#ffffff",
    });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <FlatList
        testID="flat-list"
        style={[tw`bg-white`, { padding: 10 }]}
        contentContainerStyle={[tw`bg-white`, { padding: 10 }]}
        ListFooterComponentStyle={[tw`bg-white`, { padding: 10 }]}
        ListHeaderComponentStyle={[tw`bg-white`, { padding: 10 }]}
        columnWrapperStyle={[tw`bg-white`, { padding: 10 }]}
        numColumns={2}
        data={[1, 2]}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const viewNode = getAllByTestId("view");
    const { getProp } = getByTestId("flat-list");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
    expect(getProp("ListFooterComponentStyle")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
    expect(getProp("ListHeaderComponentStyle")).toEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
    // columnWrapperStyle
    expect(viewNode[0].parentNode.props.style).toContainEqual({
      backgroundColor: "#ffffff",
      padding: 10,
    });
  });
});
