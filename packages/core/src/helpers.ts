import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import merge from "deepmerge";
import { Style, Variant, TailwindStyle } from "./types";

export const combineStyle = (style: Style): TailwindStyle => {
  // If is an array
  if (Array.isArray(style)) {
    // TODO: deal with this typing
    return (style as any[]).reduce(
      (acc, style) => {
        return merge(acc, combineStyle(style));
      },
      { media: { "": {} } }
    );
  }
  const isTailwindStyle = typeof (style as TailwindStyle)?.media !== "undefined";

  // If is already a tw style, do nothing
  if (isTailwindStyle) return style as TailwindStyle;

  // If not, convert it to tw style as a default screen style
  return { media: { "": style as ViewStyle | TextStyle | ImageStyle } };
};
