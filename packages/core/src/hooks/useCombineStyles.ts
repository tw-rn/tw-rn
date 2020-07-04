import { useMemo } from "react";
import merge from "deepmerge";
import { ReactNativeStyle } from "../types";

export const useCombineStyles = (
  stylesToCombine: (ReactNativeStyle | null | undefined)[][]
): (ReactNativeStyle | null | undefined)[] => {
  return useMemo(() => {
    const mergedStyles = stylesToCombine.reduce((acc, styles) => {
      const merged = styles.map((style, index) => {
        // Building up the array
        if (acc.length - 1 < index) return style;

        if (style === undefined) return acc[index];

        if (style === null || acc[index] === null || acc[index] === undefined) return null;

        return merge({ ...acc[index] }, style);
      }, {});

      return merged;
    }, []);

    return mergedStyles;
  }, stylesToCombine);
};
