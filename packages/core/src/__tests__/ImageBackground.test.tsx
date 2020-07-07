import React from "react";
import { render, toJSON } from "@testing-library/react-native";
import { tw, ImageBackground } from "..";

const imageBackgroundInitialStyles = [
  { bottom: 0, left: 0, position: "absolute", right: 0, top: 0 },
  { height: 100, width: 100 },
];
const viewInitialStyle = { height: 100, width: 100 };

const source = {
  uri:
    "data:ImageBackground/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
};

describe("ImageBackground", () => {
  it("should render correctly with required styles", () => {
    const { getByTestId } = render(
      <ImageBackground
        testID="ImageBackground"
        style={{ width: 100, height: 100 }}
        source={source}
      />
    );

    const node = getByTestId("ImageBackground");
    const { getProp } = node;

    expect(node.parentNode.props.style).toEqual(viewInitialStyle);
    expect(getProp("style")).toEqual([...imageBackgroundInitialStyles, undefined]);
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <ImageBackground
        testID="ImageBackground"
        style={{ width: 100, height: 100, backgroundColor: "#000000" }}
        imageStyle={{ backgroundColor: "#ffffff" }}
        source={source}
      />
    );

    const node = getByTestId("ImageBackground");
    const { getProp } = node;

    expect(node.parentNode.props.style).toEqual({
      ...viewInitialStyle,
      backgroundColor: "#000000",
    });
    expect(getProp("style")).toEqual([
      ...imageBackgroundInitialStyles,
      { backgroundColor: "#ffffff" },
    ]);

    rerender(
      <ImageBackground
        testID="ImageBackground"
        style={[{ width: 100, height: 100 }, { backgroundColor: "#000000" }, { padding: 10 }]}
        imageStyle={{ backgroundColor: "#ffffff" }}
        source={source}
      />
    );

    expect(node.parentNode.props.style).toEqual({
      ...viewInitialStyle,
      backgroundColor: "#000000",
      padding: 10,
    });
    expect(getProp("style")).toEqual([
      ...imageBackgroundInitialStyles,
      { backgroundColor: "#ffffff" },
    ]);
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(
      <ImageBackground
        testID="ImageBackground"
        style={tw`h-100 w-100 bg-black`}
        imageStyle={tw`bg-white`}
        source={source}
      />
    );

    const node = getByTestId("ImageBackground");
    const { getProp } = node;

    expect(node.parentNode.props.style).toEqual({
      ...viewInitialStyle,
      backgroundColor: "#000000",
    });
    expect(getProp("style")).toEqual([
      ...imageBackgroundInitialStyles,
      { backgroundColor: "#ffffff" },
    ]);
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <ImageBackground
        testID="ImageBackground"
        style={[tw`h-100 w-100 bg-black`, { padding: 10 }]}
        imageStyle={[tw`bg-white`, { padding: 10 }]}
        source={source}
      />
    );

    const node = getByTestId("ImageBackground");
    const { getProp } = node;

    expect(node.parentNode.props.style).toEqual({
      ...viewInitialStyle,
      backgroundColor: "#000000",
      padding: 10,
    });
    expect(getProp("style")).toEqual([
      ...imageBackgroundInitialStyles,
      { backgroundColor: "#ffffff", padding: 10 },
    ]);
  });
});
