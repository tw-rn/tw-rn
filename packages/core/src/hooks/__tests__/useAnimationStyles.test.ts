import { Animated } from "react-native";
import { renderHook } from "@testing-library/react-hooks";
import { useAnimationStyles } from "../useAnimationStyles";
import { Style } from "../../types";
import { timeTravel, setupTimeTravel } from "../../helpers/tests";

describe("useAnimationStyles", () => {
  beforeEach(setupTimeTravel);

  it("should render correctly", () => {
    const combinedStyles: Style[] = [];

    const { result } = renderHook(() => useAnimationStyles(combinedStyles));
    const {
      requiresAnimatedComponent,
      regularOrAnimatedStyles,
    } = result.current;

    expect(requiresAnimatedComponent).toBe(false);
    expect(regularOrAnimatedStyles).toEqual([]);
  });

  describe("transitionProperty", () => {
    describe("opacity", () => {
      it("should not have any opacity value if not specified", () => {
        const combinedStyles: Style[] = [
          { transitionProperty: ["opacity"], backgroundColor: "#ffffff" },
        ];

        const { result } = renderHook(() => useAnimationStyles(combinedStyles));
        const {
          requiresAnimatedComponent,
          regularOrAnimatedStyles,
        } = result.current;

        const { opacity, backgroundColor } = regularOrAnimatedStyles[0] || {};

        expect(requiresAnimatedComponent).toBe(true);
        expect(backgroundColor).toBe("#ffffff");
        expect(opacity).toBeFalsy();
      });

      it("should initialize the opacity with the specified opacity value", () => {
        const combinedStyles: Style[] = [
          {
            transitionProperty: ["opacity"],
            opacity: 0.75,
            backgroundColor: "#ffffff",
          },
        ];

        const { result } = renderHook(() => useAnimationStyles(combinedStyles));
        const {
          requiresAnimatedComponent,
          regularOrAnimatedStyles,
        } = result.current;

        const { opacity, backgroundColor } = regularOrAnimatedStyles[0] || {};

        expect(requiresAnimatedComponent).toBeTruthy();
        expect(backgroundColor).toBe("#ffffff");
        expect(opacity).toBeTruthy();
        expect((opacity as any).__getValue()).toBe(0.75);
      });

      it.only("should change the opacity of Animated.Value when style changes", async () => {
        let combinedStyles: Style[] = [
          {
            transitionProperty: ["opacity"],
            transitionDuration: 1000,
            opacity: 1,
            backgroundColor: "#ffffff",
          },
        ];

        const { result, rerender } = renderHook(
          ({ combinedStyles }) => useAnimationStyles(combinedStyles),
          { initialProps: { combinedStyles } }
        );
        let { regularOrAnimatedStyles } = result.current;
        let { opacity, backgroundColor } = regularOrAnimatedStyles[0] || {};

        expect(backgroundColor).toBe("#ffffff");
        expect(opacity as any).toBeTruthy();
        expect((opacity as any).__getValue()).toBe(1);

        combinedStyles = [
          {
            transitionProperty: ["opacity"],
            transitionDuration: 1000,
            opacity: 0,
            backgroundColor: "#ffffff",
          },
        ];

        rerender({ combinedStyles });

        timeTravel(500);

        ({ regularOrAnimatedStyles } = result.current);
        ({ opacity } = regularOrAnimatedStyles[0] || {});

        expect((opacity as any).__getValue()).toBe(0);
      });

      it.todo(
        "should animate to the default if the opacity was specified before and is now removed"
      );
    });
  });
});
