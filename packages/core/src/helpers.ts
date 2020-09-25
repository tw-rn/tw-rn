import { Platform, StyleProp } from "react-native";
import merge from "deepmerge";
import isPlainObject from "is-plain-object";

import {
  TailwindReactNativeStyle,
  ComputedTailwindReactNativeStyles,
  PlatformVariantStyle,
  PlatformVariant,
  platformVariants,
} from "./types";

export const convertToTailwindReactNativeStyle = (
  style: StyleProp<TailwindReactNativeStyle>
): Required<TailwindReactNativeStyle> | undefined => {
  if (style === undefined) return;

  // If is an array
  if (Array.isArray(style)) {
    // TODO: deal with this typing
    return (style as any[]).reduce(
      (acc, style) => {
        return merge(acc, convertToTailwindReactNativeStyle(style) || {}, {
          isMergeableObject: isPlainObject,
        });
      },
      { __: {} }
    );
  }
  const isTailwindStyle = !!(style as TailwindReactNativeStyle)?.__;

  // If is already a tw style, do nothing
  if (isTailwindStyle) return style as Required<TailwindReactNativeStyle>;

  // If not, convert it to tw style as a default screen style
  return { __: { common: { media: { "": (style as any) ?? {} } } } };
};

export const getStylesFromPlatform = (
  styles?: ComputedTailwindReactNativeStyles
): PlatformVariantStyle | undefined => {
  if (styles === undefined) return;

  const common = styles.common || {};

  const os: PlatformVariant = Platform.OS as any;

  // Native os variant handling
  const isNative = Platform.OS === "android" || Platform.OS === "ios";
  const nativeStyles = isNative && styles.native ? styles.native : {};

  // OS specific styles
  const osStyles = styles[os] || {};

  return merge.all([common, osStyles, nativeStyles], {
    isMergeableObject: isPlainObject,
  });
};
