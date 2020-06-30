import { useMemo } from "react";
import { ComputedTailwindReactNativeStyles, Style } from "../types";
import { convertToTailwindReactNativeStyle } from "../helpers";

export const useTailwindReactNativeStyle = (style: Style): ComputedTailwindReactNativeStyles => {
  return useMemo(() => {
    const { __ } = convertToTailwindReactNativeStyle(style);
    return __;
  }, [style]);
};
