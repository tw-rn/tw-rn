import { useMemo } from "react";
import { ComputedTailwindReactNativeStyles, PlatformVariantStyle } from "../types";
import { getStylesFromPlatform } from "../helpers";

export const usePlatformStyles = (
  styles: (ComputedTailwindReactNativeStyles | undefined)[]
): (PlatformVariantStyle | undefined)[] => {
  return useMemo(() => {
    return styles.map((style) => getStylesFromPlatform(style));
  }, [styles]);
};
