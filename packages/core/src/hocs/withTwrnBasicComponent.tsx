import React, { ComponentType, FunctionComponent } from "react";
import { Style, VariantsFunctions } from "../types";
import { useTwrnStyles } from "../hooks";

export type TwrnBasicComponentProps<P> = {
  style?: Style;
} & VariantsFunctions &
  Omit<P, "style">;

export const withTwrnBasicComponent = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<TwrnBasicComponentProps<P>> => ({
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const {
    combinedStyles: [combinedStyle],
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles([style], onMouseEnter, onMouseLeave, onFocus, onBlur);

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyle === null) return null;

  return (
    <Component
      {...(props as P)}
      style={combinedStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default withTwrnBasicComponent;
