import React, { ComponentType, FunctionComponent } from "react";
import { Style, VariantsProps } from "../types";
import { useTwrnStyles } from "../hooks";

export type TwrnFlatListProps<P> = {
  style?: Style;
  contentContainerStyle?: Style;
  ListFooterComponentStyle?: Style;
  ListHeaderComponentStyle?: Style;
  columnWrapperStyle?: Style;
} & VariantsProps &
  Omit<
    P,
    | "style"
    | "contentContainerStyle"
    | "ListFooterComponentStyle"
    | "ListHeaderComponentStyle"
    | "columnWrapperStyle"
  >;

export const withTwrnFlatList = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<TwrnFlatListProps<P>> => ({
  style,
  contentContainerStyle,
  ListFooterComponentStyle,
  ListHeaderComponentStyle,
  columnWrapperStyle,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const {
    combinedStyles: [
      combinedStyle,
      combinedContentContainerStyle,
      combinedListFooterComponentStyle,
      combinedListHeaderComponentStyle,
      combinedColumnWrapperStyle,
    ],
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  } = useTwrnStyles(
    [
      style,
      contentContainerStyle,
      ListFooterComponentStyle,
      ListHeaderComponentStyle,
      columnWrapperStyle,
    ],
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  );

  // If combined style is null, it means that we're in SSR and should not
  // render because we don't have the destination size. Note: can be improved.
  if (
    combinedStyle === null ||
    combinedContentContainerStyle === null ||
    combinedListFooterComponentStyle === null ||
    combinedListHeaderComponentStyle === null ||
    combinedColumnWrapperStyle === null
  )
    return null;

  return (
    <Component
      style={combinedStyle}
      contentContainerStyle={combinedContentContainerStyle}
      ListFooterComponentStyle={combinedListFooterComponentStyle}
      ListHeaderComponentStyle={combinedListHeaderComponentStyle}
      columnWrapperStyle={combinedColumnWrapperStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...(props as P)}
    />
  );
};

export default withTwrnFlatList;
