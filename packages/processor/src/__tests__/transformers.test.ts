import {
  transitionDurationTransformer,
  transitionDelayTransformer,
  transitionTimingFunctionTransformer,
  transitionPropertyTransformer,
} from "../transformers";

describe("transformers", () => {
  describe("transitionDurationTransformer", () => {
    it("should parse milliseconds declarations", () => {
      expect(
        transitionDurationTransformer(["transition-duration", "2ms"])
      ).toEqual({ transitionDuration: 2 });
    });

    it("should parse seconds declarations", () => {
      expect(
        transitionDurationTransformer(["transition-duration", "2s"])
      ).toEqual({ transitionDuration: 2000 });
    });

    it("should parse seconds declarations", () => {
      expect(
        transitionDurationTransformer(["transition-duration", "0.5s"])
      ).toEqual({ transitionDuration: 500 });
    });

    it("should error on invalid value", () => {
      expect(() =>
        transitionDurationTransformer(["transition-duration", "2invalid"])
      ).toThrow();
    });
  });

  describe("transitionDelayTransformer", () => {
    it("should parse milliseconds declarations", () => {
      expect(transitionDelayTransformer(["transition-delay", "2ms"])).toEqual({
        transitionDelay: 2,
      });
    });

    it("should parse seconds declarations", () => {
      expect(transitionDelayTransformer(["transition-delay", "2s"])).toEqual({
        transitionDelay: 2000,
      });
    });

    it("should parse seconds declarations", () => {
      expect(transitionDelayTransformer(["transition-delay", "0.5s"])).toEqual({
        transitionDelay: 500,
      });
    });

    it("should error on invalid value", () => {
      expect(() =>
        transitionDelayTransformer(["transition-delay", "2invalid"])
      ).toThrow();
    });
  });

  describe("transitionTimingFunctionTransformer", () => {
    describe.each([
      "ease",
      "ease-in",
      "ease-out",
      "ease-in-out",
      "linear",
      "step-start",
      "step-end",
    ])("%s", (transition) => {
      it("should parse correctly", () => {
        expect(
          transitionTimingFunctionTransformer([
            "transition-timing-function",
            transition,
          ])
        ).toEqual({
          transitionTimingFunction: {
            type: transition,
            args: [],
          },
        });
      });
    });
    describe("ease", () => {
      it("should parse correctly", () => {
        expect(
          transitionTimingFunctionTransformer([
            "transition-timing-function",
            "ease",
          ])
        ).toEqual({
          transitionTimingFunction: {
            type: "ease",
            args: [],
          },
        });
      });
    });

    describe("cubic-bezier", () => {
      it("should parse correctly", () => {
        expect(
          transitionTimingFunctionTransformer([
            "transition-timing-function",
            "cubic-bezier(0.4, 0, 1, 1)",
          ])
        ).toEqual({
          transitionTimingFunction: {
            type: "bezier",
            args: [0.4, 0, 1, 1],
          },
        });
      });

      it("should throw when invalid", () => {
        expect(() =>
          transitionTimingFunctionTransformer([
            "transition-timing-function",
            "cubic-bezier(0.4, 0, 1)",
          ])
        ).toThrow();
      });
    });

    it("should throw if not supported", () => {
      expect(() =>
        transitionTimingFunctionTransformer([
          "transition-timing-function",
          "not supported",
        ])
      ).toThrow();
    });
  });

  describe("transitionPropertyTransformer", () => {
    it("should parse correctly", () => {
      expect(
        transitionPropertyTransformer(["transition-property", "none"])
      ).toEqual({
        transitionProperty: [],
      });

      expect(
        transitionPropertyTransformer([
          "transition-property",
          "background-color, border-color, color",
        ])
      ).toEqual({
        transitionProperty: ["background-color", "border-color", "color"],
      });
    });
  });
});
