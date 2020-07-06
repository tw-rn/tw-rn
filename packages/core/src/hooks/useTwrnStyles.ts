import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { useMemo } from "react";
import { Style, ReactNativeStyle } from "../types";
import { usePlatformStyles } from "./usePlatformStyles";
import { useTailwindReactNativeStyle } from "./useTailwindReactNativeStyle";
import { useMediaStyles } from "./useMediaStyles";
import { useHoverStyles } from "./useHoverStyles";
import { useFocusStyles } from "./useFocusStyles";
import { useOrientationStyles } from "./useOrientationStyles";
import { useCombineStyles } from "./useCombineStyles";

export const useTwrnStyles = (
  styles: Style[],
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void,
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
): {
  combinedStyles: (ReactNativeStyle | null | undefined)[];
  handleOnMouseEnter: (e: any) => void;
  handleOnMouseLeave: (e: any) => void;
  handleOnFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  handleOnBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} => {
  const tailwindReactNativeStyle = useTailwindReactNativeStyle(styles);

  const platformStyles = usePlatformStyles(tailwindReactNativeStyle);

  const mediaStyles = useMediaStyles(platformStyles);

  const { hoverStyles, handleOnMouseEnter, handleOnMouseLeave } = useHoverStyles(
    platformStyles,
    onMouseEnter,
    onMouseLeave
  );

  const { focusStyles, handleOnFocus, handleOnBlur } = useFocusStyles(
    platformStyles,
    onFocus,
    onBlur
  );

  const orientationStyles = useOrientationStyles(platformStyles);

  const combinedStyles = useCombineStyles([
    mediaStyles,
    orientationStyles,
    hoverStyles,
    focusStyles,
  ]);

  return {
    combinedStyles,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  };
};
