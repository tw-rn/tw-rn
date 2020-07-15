import React, {
  ComponentType,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  TargetedEvent,
  StyleProp,
  Animated,
} from "react-native";
import { TailwindReactNativeStyle } from "../types";
import {
  useTailwindReactNativeStyle,
  usePlatformStyles,
  useMediaStyles,
  useHoverStyles,
  useFocusStyles,
  useOrientationStyles,
  useAnimationStyles,
  useCombineStyles,
} from "../hooks";

export type VariantProps<P, O extends keyof P> = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} & { [key in O]?: StyleProp<TailwindReactNativeStyle & P[O]> } &
  Omit<P, O>;

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

  // Convert animated styles if needed
  const {
    requiresAnimatedComponent,
    regularOrAnimatedStyles,
  } = useAnimationStyles(combinedStyles);

  // Combining styles position with keys indicated in the styleKeys
  const regularOrAnimatedStylesProps = useMemo(
    () =>
      styleKeys.reduce(
        (acc, key, index) => ({
          ...acc,
          [key]: regularOrAnimatedStyles[index],
        }),
        {}
      ),
    [regularOrAnimatedStyles]
  );

  const ComponentToRender = useMemo(() => {
    return requiresAnimatedComponent
      ? ((Animated.createAnimatedComponent(
          Component
        ) as unknown) as typeof Component)
      : Component;
  }, [requiresAnimatedComponent]);

  // If combinedStyles are null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyles.some((style) => style === null)) return null;

  return (
    <ComponentToRender
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
