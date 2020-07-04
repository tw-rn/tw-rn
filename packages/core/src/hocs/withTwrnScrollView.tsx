import React, { FunctionComponent, ComponentType } from "react";
import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { Style } from "../types";
import { useTwrnStyles } from "../hooks";

export type TailwindNativeScrollViewHocProps = {
  style?: Style;
  contentContainerStyle?: Style;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
};

export const withTwrnScrollView = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<
  TailwindNativeScrollViewHocProps & Omit<P, "style" | "contentContainerStyle">
> => ({ style, contentContainerStyle, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }) => {
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
