import React, { FunctionComponent, ComponentType } from "react";
import { ScrollViewProps } from "react-native";
import { Style, VariantsFunctions } from "../types";
import { useTwrnStyles } from "../hooks";

export type TwrnScrollViewProps = {
  style?: Style;
  contentContainerStyle?: Style;
} & VariantsFunctions &
  Omit<ScrollViewProps, "style" | "contentContainerStyle">;

export const withTwrnScrollView = <P extends ScrollViewProps>(
  Component: ComponentType<P>
): FunctionComponent<TwrnScrollViewProps> => ({
  style,
  contentContainerStyle,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const {
    combinedStyles: [combinedStyle, combinedContentContainerStyle],
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles([style, contentContainerStyle], onMouseEnter, onMouseLeave, onFocus, onBlur);

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (combinedStyle === null || combinedContentContainerStyle === null) return null;

  return (
    <Component
      style={combinedStyle}
      contentContainerStyle={combinedContentContainerStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...(props as P)}
    />
  );
};

export default withTwrnScrollView;
