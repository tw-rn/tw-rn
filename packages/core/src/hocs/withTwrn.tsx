import React, { useMemo, FunctionComponent, ComponentType } from "react";
import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { Style, ReactNativeStyle } from "../types";
import { useTwrnStyles } from "../hooks";

export type TailwindNativeHocProps = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
};

export const withTwrn = <P extends object, T extends string = "style">(
  Component: ComponentType<P>
): FunctionComponent<TailwindNativeHocProps & { [key in T]?: Style } & Omit<P, T>> => ({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const styles: Style[] = useMemo(() => styleKeys.map((key) => (props as any)[key]), [props]);

  const {
    combinedStyles,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles(styles, onMouseEnter, onMouseLeave, onFocus, onBlur);

  const keyedStyles = useMemo(
    () =>
      combinedStyles.reduce<{ [key: string]: ReactNativeStyle | null | undefined }>(
        (acc, style, index) => {
          return { ...acc, [styleKeys[index]]: style };
        },
        {}
      ),
    [combinedStyles]
  );

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyles.some((s) => s === null)) return null;

  return (
    <Component
      {...(props as P)}
      {...keyedStyles}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default withTwrn;
