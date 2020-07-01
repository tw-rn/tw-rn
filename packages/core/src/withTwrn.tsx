import React, { useMemo, FunctionComponent, ComponentType } from "react";
import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import merge from "deepmerge";
import { Style } from "./types";
import {
  usePlatformStyle,
  useMediaStyle,
  useTailwindReactNativeStyle,
  useHoverStyle,
  useFocusStyle,
} from "./hooks";

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

  const { hoverStyle, handleOnMouseEnter, handleOnMouseLeave } = useHoverStyle(
    platformStyle,
    onMouseEnter,
    onMouseLeave
  );

  const { focusStyle, handleOnFocus, handleOnBlur } = useFocusStyle(platformStyle, onFocus, onBlur);

  const combinedStyle = useMemo(() => merge.all([mediaStyle || {}, hoverStyle, focusStyle]), [
    mediaStyle,
    hoverStyle,
    focusStyle,
  ]);

  // If media style is not applied, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (mediaStyle === undefined) return null;

  return (
    <Component
      style={combinedStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...(props as P)}
    />
  );
};

export default withTwrn;
