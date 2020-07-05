import React, { ComponentType, FunctionComponent, Component, useMemo } from "react";
import { Style, ReactNativeStyle } from "../types";
import { useTwrnStyles } from "../hooks";
import { NativeSyntheticEvent, TargetedEvent, View, ViewProps } from "react-native";

export type VariantProps<P, O extends keyof P> = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} & { [key in O]?: Style } &
  Omit<P, O>;

export const withTwrn = <P extends object, O extends keyof P>(
  Component: ComponentType<P>,
  styleKeys: O[]
): FunctionComponent<VariantProps<P, O>> => ({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  // Extracting styles from props indicated in the styleKeys
  const [newProps, styles] = useMemo(() => {
    const newProps = { ...props };
    const styles = styleKeys.map((key) => {
      // TODO: fix typings
      delete (newProps as any)[key];
      return (props as any)[key];
    });

    return [newProps, styles];
  }, [props]);

  const {
    combinedStyles,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles(styles, onMouseEnter, onMouseLeave, onFocus, onBlur);

  // Combining styles position with keys indicated in the styleKeys
  const combinedStylesProps = useMemo(() => {
    return styleKeys.reduce((acc, key, index) => {
      return { ...acc, [key]: combinedStyles[index] };
    }, {});
  }, [combinedStyles]);

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyles.some((style) => style === null)) return null;

  return (
    <Component
      {...(newProps as P)}
      {...combinedStylesProps}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default withTwrn;
