import React, { ComponentType, FunctionComponent } from "react";
import { Style, VariantsFunctions } from "../types";
import { useTwrnStyles } from "../hooks";

export type TwrnImageBackgroundProps<P> = {
  style?: Style;
  imageStyle?: Style;
} & VariantsFunctions &
  Omit<P, "style" | "imageStyle">;

export const withTwrnImageBackground = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<TwrnImageBackgroundProps<P>> => ({
  style,
  imageStyle,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const {
    combinedStyles: [combinedStyle, combinedImageStyle],
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles([style, imageStyle], onMouseEnter, onMouseLeave, onFocus, onBlur);

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyle === null || combinedImageStyle === null) return null;

  return (
    <Component
      style={combinedStyle}
      imageStyle={combinedImageStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...(props as P)}
    />
  );
};

export default withTwrnImageBackground;
