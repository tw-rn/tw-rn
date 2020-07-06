import { ViewStyle, TextStyle, ImageStyle, Platform } from "react-native";
import merge from "deepmerge";
import {
  Style,
  TailwindReactNativeStyle,
  ComputedTailwindReactNativeStyles,
  PlatformVariantStyle,
  PlatformVariant,
  platformVariants,
} from "./types";

export const convertToTailwindReactNativeStyle = (
  style: Style
): Required<TailwindReactNativeStyle> | undefined => {
  if (style === undefined) return;

  // If is an array
  if (Array.isArray(style)) {
    // TODO: deal with this typing
    return (style as any[]).reduce(
      (acc, style) => {
        return merge(acc, convertToTailwindReactNativeStyle(style) || {});
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

export const getStylesFromPlatform = (
  styles?: ComputedTailwindReactNativeStyles
): PlatformVariantStyle | undefined => {
  if (styles === undefined) return;

  const native = styles.native ?? {};

  const os: PlatformVariant = Platform.OS as any;

  if (!platformVariants.includes(os)) return native;

  return merge(native, styles[os] ?? {});
};
