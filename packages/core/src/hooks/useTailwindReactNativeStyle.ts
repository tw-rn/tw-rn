import { useMemo } from "react";
import { ComputedTailwindReactNativeStyles, Style } from "../types";
import { convertToTailwindReactNativeStyle } from "../helpers";

export const useTailwindReactNativeStyle = (
  styles: Style[]
): (ComputedTailwindReactNativeStyles | undefined)[] => {
  return useMemo(() => {
    return (styles as Style[]).map((style) => convertToTailwindReactNativeStyle(style)?.__);
  }, [styles]);
};
