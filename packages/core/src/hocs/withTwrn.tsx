import React, { ComponentType, useMemo } from "react";
import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { TailwindReactNativeStyleProps } from "../types";
import {
  useTailwindReactNativeStyle,
  usePlatformStyles,
  useMediaStyles,
  useHoverStyles,
  useFocusStyles,
  useOrientationStyles,
  useCombineStyles,
} from "../hooks";

export type VariantProps<P, O extends keyof P> = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} & TailwindReactNativeStyleProps<P, O>;

export const withTwrn = <P extends object, O extends keyof P>(
  Component: ComponentType<P>,
  styleKeys: O[]
): ComponentType<VariantProps<P, O>> => ({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const tailwindReactNativeStyle = useTailwindReactNativeStyle(
    props,
    styleKeys
  );

  const platformStyles = usePlatformStyles(tailwindReactNativeStyle);

  const mediaStyles = useMediaStyles(platformStyles);

  const {
    hoverStyles,
    handleOnMouseEnter,
    handleOnMouseLeave,
  } = useHoverStyles(platformStyles, onMouseEnter, onMouseLeave);

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

  // Combining styles position with keys indicated in the styleKeys
  const regularOrAnimatedStylesProps = useMemo(
    () =>
      styleKeys.reduce(
        (acc, key, index) => ({
          ...acc,
          [key]: combinedStyles[index],
        }),
        {}
      ),
    [combinedStyles]
  );

  // If combinedStyles are null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyles.some((style) => style === null)) return null;

  return (
    <Component
      {...(props as P)}
      {...regularOrAnimatedStylesProps}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default withTwrn;
