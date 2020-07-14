import { renderHook, act } from "@testing-library/react-hooks";
import { wait } from "@testing-library/react-native";
import { useAnimationStyles } from "../useAnimationStyles";
import { PlatformVariantStyle, Style } from "../../types";
import { Animated } from "../..";
import { timeTravel, setupTimeTravel } from "../../helpers/tests";

describe("useAnimationStyles", () => {
  beforeEach(setupTimeTravel);

  it("should render correctly", () => {
    const styles: PlatformVariantStyle[] = [];
    const combinedStyles: Style[] = [];

    const { result } = renderHook(() => useAnimationStyles(styles, combinedStyles));
    const { needsAnimatedComponent, regularOrAnimatedStyles } = result.current;

    expect(needsAnimatedComponent).toBe(false);
    expect(regularOrAnimatedStyles).toEqual([]);
  });

  describe("transition-opacity", () => {
    it("should have the opacity Animated.Value with the default opacity value", () => {
      const styles: PlatformVariantStyle[] = [
        { animation: { transitionType: "transition-opacity" } },
      ];
      const combinedStyles: Style[] = [{ backgroundColor: "#ffffff" }];

      const { result } = renderHook(() => useAnimationStyles(styles, combinedStyles));
      const { needsAnimatedComponent, regularOrAnimatedStyles } = result.current;

      const { opacity, backgroundColor } = regularOrAnimatedStyles[0] || {};

      expect(needsAnimatedComponent).toBe(true);
      expect(backgroundColor).toBe("#ffffff");
      expect((opacity as any) instanceof Animated.Value).toBe(true);
      expect((opacity as any)._value).toBe(1);
    });

    it("should have the opacity Animated.Value with the specified opacity value", () => {
      const styles: PlatformVariantStyle[] = [
        { animation: { transitionType: "transition-opacity" } },
      ];
      const combinedStyles: Style[] = [{ opacity: 0.75, backgroundColor: "#ffffff" }];

      const { result } = renderHook(() => useAnimationStyles(styles, combinedStyles));
      const { needsAnimatedComponent, regularOrAnimatedStyles } = result.current;

      const { opacity, backgroundColor } = regularOrAnimatedStyles[0] || {};

      expect(needsAnimatedComponent).toBe(true);
      expect(backgroundColor).toBe("#ffffff");
      expect((opacity as any) instanceof Animated.Value).toBe(true);
      expect((opacity as any)._value).toBe(0.75);
    });

    it("should change the opacity of Animated.Value when style changes", async () => {
      const styles: PlatformVariantStyle[] = [
        { animation: { transitionType: "transition-opacity" } },
      ];
      let combinedStyles: Style[] = [{ opacity: 1, backgroundColor: "#ffffff" }];

      const { result, rerender } = renderHook(
        ({ styles, combinedStyles }) => useAnimationStyles(styles, combinedStyles),
        { initialProps: { styles, combinedStyles } }
      );
      let { regularOrAnimatedStyles } = result.current;

      expect(regularOrAnimatedStyles[0]?.backgroundColor).toBe("#ffffff");
      expect((regularOrAnimatedStyles[0]?.opacity as any) instanceof Animated.Value).toBe(true);
      expect((regularOrAnimatedStyles[0]?.opacity as any)._value).toBe(1);

      combinedStyles = [{ opacity: 0, backgroundColor: "#ffffff" }];

      rerender({ styles, combinedStyles });

      timeTravel(1000);

      ({ regularOrAnimatedStyles } = result.current);

      expect((regularOrAnimatedStyles[0]?.opacity as any)._value).toBe(0);
    });
  });
});
