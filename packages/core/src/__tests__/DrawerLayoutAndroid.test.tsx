import React from "react";
import { render } from "@testing-library/react-native";
import { tw, DrawerLayoutAndroid, View } from "..";

const viewInitialStyle = { alignSelf: "flex-start", borderColor: "red", borderWidth: 1 };

describe("DrawerLayoutAndroid", () => {
  it("should render correctly with no styles", () => {
    const { container } = render(
      <DrawerLayoutAndroid testID="DrawerLayoutAndroid" renderNavigationView={() => <View />} />
    );
    expect(container.children[0].getProp("style")).toEqual([viewInitialStyle, undefined]);
  });

  it("should render correctly with empty styles", () => {
    const { container } = render(
      <DrawerLayoutAndroid
        testID="DrawerLayoutAndroid"
        style={{}}
        renderNavigationView={() => <View />}
      />
    );

    expect(container.children[0].getProp("style")).toEqual([viewInitialStyle, {}]);
  });

  it("should render regular react-native styles", () => {
    const { container, rerender } = render(
      <DrawerLayoutAndroid
        testID="DrawerLayoutAndroid"
        style={{ backgroundColor: "#ffffff" }}
        renderNavigationView={() => <View />}
      />
    );

    expect(container.children[0].getProp("style")).toEqual([
      viewInitialStyle,
      { backgroundColor: "#ffffff" },
    ]);

    rerender(
      <DrawerLayoutAndroid
        testID="DrawerLayoutAndroid"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        renderNavigationView={() => <View />}
      />
    );

    expect(container.children[0].getProp("style")).toEqual([
      viewInitialStyle,
      { backgroundColor: "#ffffff", padding: 10 },
    ]);
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { container } = render(
      <DrawerLayoutAndroid
        testID="DrawerLayoutAndroid"
        style={tw`bg-white`}
        renderNavigationView={() => <View />}
      />
    );

    expect(container.children[0].getProp("style")).toEqual([
      viewInitialStyle,
      { backgroundColor: "#ffffff" },
    ]);
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { container } = render(
      <DrawerLayoutAndroid
        testID="DrawerLayoutAndroid"
        style={[tw`bg-white`, { padding: 10 }]}
        renderNavigationView={() => <View />}
      />
    );

    expect(container.children[0].getProp("style")).toEqual([
      viewInitialStyle,
      { backgroundColor: "#ffffff", padding: 10 },
    ]);
  });
});
