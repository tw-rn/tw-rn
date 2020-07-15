import { useMemo } from "react";
import merge from "deepmerge";
import isPlainObject from "is-plain-object";
import { Style } from "../types";

export const useCombineStyles = (
  stylesToCombine: (Style | null | undefined)[][]
): (Style | null | undefined)[] => {
  return useMemo(() => {
    const mergedStyles = stylesToCombine.reduce((acc, styles) => {
      const merged = styles.map((style, index) => {
        // Building up the array
        if (acc.length - 1 < index) return style;

        if (style === undefined) return acc[index];

        if (style === null || acc[index] === null || acc[index] === undefined) return null;

        return merge({ ...acc[index] }, style, { isMergeableObject: isPlainObject });
      }, {});

      return merged;
    }, []);

    return mergedStyles;
  }, stylesToCombine);
};
