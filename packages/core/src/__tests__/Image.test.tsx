import React from "react";
import { render } from "@testing-library/react-native";
import { tw, Image } from "..";

const source = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
};

describe("Image", () => {
  it("should render correctly with no styles", () => {
    const { getByTestId } = render(<Image testID="image" source={source} />);
    const { getProp } = getByTestId("image");

    expect(getProp("style")).toEqual(undefined);
  });

  it("should render correctly with empty styles", () => {
    const { getByTestId } = render(<Image testID="image" style={{}} source={source} />);

    const { getProp } = getByTestId("image");

    expect(getProp("style")).toEqual({});
  });

  it("should render regular react-native styles", () => {
    const { getByTestId, rerender } = render(
      <Image testID="image" style={{ backgroundColor: "#ffffff" }} source={source} />
    );

    const { getProp } = getByTestId("image");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });

    rerender(
      <Image
        testID="image"
        style={[{ backgroundColor: "#ffffff" }, { padding: 10 }]}
        source={source}
      />
    );

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { getByTestId } = render(<Image testID="image" style={tw`bg-white`} source={source} />);

    const { getProp } = getByTestId("image");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { getByTestId } = render(
      <Image testID="image" style={[tw`bg-white`, { padding: 10 }]} source={source} />
    );

    const { getProp } = getByTestId("image");

    expect(getProp("style")).toEqual({ backgroundColor: "#ffffff", padding: 10 });
  });
});
