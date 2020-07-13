import { renderHook } from "@testing-library/react-hooks";
import { useAnimationStyles } from "../useAnimationStyles";
import { PlatformVariantStyle, Style } from "../../types";
import { Animated } from "../..";

describe("useAnimationStyles", () => {
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
  });
});
