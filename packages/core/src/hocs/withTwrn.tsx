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
  ...rest
}) => {
  // Extracting styles from props indicated in the styleKeys
  const { props, styles } = useMemo(() => {
    return Object.entries(rest).reduce<{ props: any; styles: Style[] }>(
      (acc, entry) => {
        const [key, PropOrStyle]: [O, any] = entry as any;

        return styleKeys.includes(key)
          ? { ...acc, styles: [...acc.styles, PropOrStyle] }
          : { ...acc, props: [...acc.props, PropOrStyle] };
      },
      { props: {}, styles: [] }
    );
  }, [rest]);

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
      return { ...acc, [key]: styleKeys[index] };
    }, {});
  }, [combinedStyles]);

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyles.some((style) => style === null)) return null;

  return (
    <Component
      {...(props as P)}
      {...combinedStylesProps}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default withTwrn;
