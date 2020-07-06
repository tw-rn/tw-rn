import React from "react";
import { render } from "@testing-library/react-native";
import { tw, View, VirtualizedList } from "..";

describe("VirtualizedList", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId, getAllByTestId } = render(
      <VirtualizedList
        testID="VirtualizedList"
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("VirtualizedList");

    expect(getProp("style")).toEqual(undefined);
    expect(getProp("contentContainerStyle")).toEqual(undefined);
    expect(getProp("ListFooterComponentStyle")).toEqual(undefined);
    expect(getProp("ListHeaderComponentStyle")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId, getAllByTestId, asJSON } = render(
      <VirtualizedList
        testID="VirtualizedList"
        style={{}}
        contentContainerStyle={{}}
        ListFooterComponentStyle={{}}
        ListHeaderComponentStyle={{}}
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("VirtualizedList");

    expect(getProp("style")).toEqual({});
    expect(getProp("contentContainerStyle")).toEqual({});
    expect(getProp("ListFooterComponentStyle")).toEqual({});
    expect(getProp("ListHeaderComponentStyle")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender, getAllByTestId } = render(
      <VirtualizedList
        testID="VirtualizedList"
        style={{ backgroundColor: "#ffffff" }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        ListFooterComponentStyle={{ backgroundColor: "#ffffff" }}
        ListHeaderComponentStyle={{ backgroundColor: "#ffffff" }}
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("VirtualizedList");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListFooterComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListHeaderComponentStyle")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <VirtualizedList
        testID="VirtualizedList"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        contentContainerStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        ListFooterComponentStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        ListHeaderComponentStyle={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
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
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId, getAllByTestId } = render(
      <VirtualizedList
        testID="VirtualizedList"
        style={tw`bg-white`}
        contentContainerStyle={tw`bg-white`}
        ListFooterComponentStyle={tw`bg-white`}
        ListHeaderComponentStyle={tw`bg-white`}
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("VirtualizedList");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("contentContainerStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListFooterComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
    expect(getProp("ListHeaderComponentStyle")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <VirtualizedList
        testID="VirtualizedList"
        style={[tw`bg-white`, { padding: 10 }]}
        contentContainerStyle={[tw`bg-white`, { padding: 10 }]}
        ListFooterComponentStyle={[tw`bg-white`, { padding: 10 }]}
        ListHeaderComponentStyle={[tw`bg-white`, { padding: 10 }]}
        data={[1, 2]}
        getItemCount={() => 2}
        getItem={() => ({})}
        renderItem={({ index }) => <View key={index} testID="view" />}
        keyExtractor={(_, index) => index.toString()}
      />
    );

    const { getProp } = getByTestId("VirtualizedList");

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
  });
});
