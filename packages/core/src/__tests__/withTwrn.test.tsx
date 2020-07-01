import React from "react";
import { View as RnView, Platform } from "react-native";
import { render } from "@testing-library/react-native";
import withTwrn from "../withTwrn";
import { tw } from "../tw";

const View = withTwrn(RnView);

describe("withTwrn", () => {
  afterAll(() => {
    Platform.OS = "ios";
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

  describe("ios", () => {
    beforeAll(() => {
      Platform.OS = "ios";
    });

    it("should not render media queries", () => {
      const { asJSON } = render(<View style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe("android", () => {
    beforeAll(() => {
      Platform.OS = "android";
    });

    it("should not render media queries on android", () => {
      const { asJSON } = render(<View style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe("web", () => {
    beforeAll(() => {
      Platform.OS = "web";
    });

    afterAll(() => {
      delete global.window;
    });

    beforeEach(() => {
      (global.window as any) = {
        matchMedia: jest.fn().mockImplementation(() => ({
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        })),
      };
    });

    it("should not render on SSR", () => {
      delete global.window;

      const { asJSON } = render(<View style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });

    it("should render media queries on web", () => {
      const { asJSON } = render(<View style={tw`sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });

    it("should render non media queries styles along media queries styles", () => {
      const { asJSON } = render(<View style={tw`p-1 sm:bg-red`} />);

      expect(asJSON()).toMatchSnapshot();
    });

    it("should respect queries order styles", () => {
      const { asJSON } = render(<View style={tw`p-1 sm:bg-red md:bg-green`} />);

      expect(asJSON()).toMatchSnapshot();
    });
  });
});
