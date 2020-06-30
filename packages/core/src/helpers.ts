import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import merge from "deepmerge";
import { Style, TailwindReactNativeStyle } from "./types";

export const convertToTailwindReactNativeStyle = (
  style: Style
): Required<TailwindReactNativeStyle> => {
  // If is an array
  if (Array.isArray(style)) {
    // TODO: deal with this typing
    return (style as any[]).reduce(
      (acc, style) => {
        return merge(acc, convertToTailwindReactNativeStyle(style));
      },
      { __: {} }
    );
  }
  const isTailwindStyle = !!(style as TailwindReactNativeStyle)?.__;

  // If is already a tw style, do nothing
  if (isTailwindStyle) return style as Required<TailwindReactNativeStyle>;

  // If not, convert it to tw style as a default screen style
  return { __: { native: { media: { "": (style || {}) as ViewStyle | TextStyle | ImageStyle } } } };
};
