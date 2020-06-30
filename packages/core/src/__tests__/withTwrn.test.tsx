import React from "react";
import { View as RnView, Platform } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrn from "../withTwrn";
import { tw } from "../tw";

const View = withTwrn(RnView);

describe("withTwrn", () => {
  afterEach(() => {
    jest.resetModules();
    delete global.window;
  });

  it("should render correctly with no styles", () => {
    const { asJSON } = render(<View />);
    expect(asJSON()).toMatchSnapshot();
  });

  it("should render regular react-native styles", () => {
    const { asJSON, rerender } = render(<View style={{ backgroundColor: "#ff0000" }} />);

    expect(asJSON()).toMatchSnapshot();

    rerender(<View style={[{ backgroundColor: "#ff0000" }, { padding: 10 }]} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it("should render tw-rn base styles correctly in ios", () => {
    const { asJSON } = render(<View style={tw`bg-white`} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it("should render tw-rn base and regular react-native styles correctly", () => {
    const { asJSON } = render(<View style={[tw`bg-white`, { padding: 10 }]} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it("should not render media queries on ios", () => {
    const { asJSON } = render(<View style={tw`sm:bg-red`} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it("should not render media queries on android", () => {
    const { asJSON } = render(<View style={tw`sm:bg-red`} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it("should not render media queries on SSR", () => {
    const { asJSON } = render(<View style={tw`sm:bg-red`} />);

    expect(asJSON()).toMatchSnapshot();
  });

  it.only("should render media queries on web", () => {
    // Platform.OS = "web";

    (global.window as any) = {
      matchMedia: jest.fn().mockImplementation(() => ({
        matches: true,
      })),
    };

    const { asJSON } = render(<View style={tw`sm:bg-red`} />);

    expect(asJSON()).toMatchSnapshot();
  });
});
