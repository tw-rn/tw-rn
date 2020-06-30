import React, { useMemo, useCallback, useState, FunctionComponent, ComponentType } from "react";
import { StyleSheet, Platform, NativeSyntheticEvent, TargetedEvent } from "react-native";
import { Style } from "./types";
import { convertToTailwindReactNativeStyle } from "./helpers";
import { usePlatformStyle, useMediaStyle, useTailwindReactNativeStyle } from "./hooks";

export type TailwindNativeHocProps = {
  style?: Style;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
};

const withTwrn = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<TailwindNativeHocProps & Omit<P, "style">> => ({
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const tailwindReactNativeStyle = useTailwindReactNativeStyle(style);

  const platformStyle = usePlatformStyle(tailwindReactNativeStyle);

  const mediaStyle = useMediaStyle(platformStyle);

  console.log({ platformStyle, mediaStyle });

  // const [isHovered, setIsHovered] = useState(false);

  // const [isFocused, setIsFocused] = useState(false);

  // const handleMouseEnter = useCallback(
  //   (e) => {
  //     setIsHovered(true);
  //     onMouseEnter && onMouseEnter(e);
  //   },
  //   [onMouseEnter]
  // );

  // const handleMouseLeave = useCallback(
  //   (e) => {
  //     setIsHovered(false);
  //     onMouseLeave && onMouseLeave(e);
  //   },
  //   [onMouseLeave]
  // );

  // const handleFocus = useCallback(
  //   (e) => {
  //     setIsFocused(true);
  //     onFocus && onFocus(e);
  //   },
  //   [onFocus]
  // );

  // const handleBlur = useCallback(
  //   (e) => {
  //     setIsFocused(false);
  //     onBlur && onBlur(e);
  //   },
  //   [onBlur]
  // );

  // console.log({ style });

  // const platformComposed = useMemo(() => {
  //   // const { native, web, ios, android } = reducedStyles;
  //   // return StyleSheet.compose(native, Platform.select({ web, ios, android }));
  // }, [reducedStyles]);

  // const composedStyle = useMemo(() => {
  //   const { hover, focus } = reducedStyles;

  //   const hoverComposed = isHovered
  //     ? StyleSheet.compose(platformComposed, hover)
  //     : platformComposed;

  //   const focusComposed = isFocused ? StyleSheet.compose(hoverComposed, focus) : hoverComposed;

  //   return focusComposed;
  // }, [platformComposed, isHovered, isFocused]);

  // const composedStyle = style
  // if (Platform.OS === "web" && typeof window === "undefined") return null;

  // if (currentMediaQueryValue === null) return null;

  // console.log({ mediaStyle });

  return (
    <Component
      style={mediaStyle}
      // style={mediaStyle}
      // onMouseEnter={handleMouseEnter} // Should work only if this has a class that uses this
      // onMouseLeave={handleMouseLeave} // Should work only if this has a class that uses this
      // onFocus={handleFocus} // Should work only if this has a class that uses this
      // onBlur={handleBlur} // Should work only if this has a class that uses this
      {...(props as P)}
    />
  );
};

export default withTwrn;
