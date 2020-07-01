import { ViewStyle, TextStyle, ImageStyle, StyleProp } from "react-native";

declare global {
  namespace NodeJS {
    interface Global {
      __TW_RN_STYLES__:
        | {
            [key: string]: { [styleName: string]: { [styleProp: string]: number | string } };
          }
        | undefined;
    }
  }
}

export type Style =
  | StyleProp<ViewStyle & TailwindReactNativeStyle>
  | StyleProp<TextStyle & TailwindReactNativeStyle>
  | StyleProp<ImageStyle & TailwindReactNativeStyle>;

export enum Variants {
  Native = "native",
  Web = "web",
  Ios = "ios",
  Android = "android",
  Media = "media",
  Landscape = "landscape",
  Focus = "focus",
  Active = "active",
  Hover = "hover",
  Disabled = "disabled",
  Visited = "visited",
  Keyboard = "keyboard",
}

export const DefaultPlatformVariant = Variants.Native;

export type PlatformVariant = Variants.Native | Variants.Web | Variants.Ios | Variants.Android;

export const platformVariants: PlatformVariant[] = [
  Variants.Native,
  Variants.Web,
  Variants.Ios,
  Variants.Android,
];

export type StyleVariants =
  | Variants.Landscape
  | Variants.Focus
  | Variants.Active
  | Variants.Hover
  | Variants.Disabled
  | Variants.Visited
  | Variants.Keyboard;

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;

export type MediaStyles = { [Variants.Media]?: { [key: string]: ReactNativeStyle } };

export type VariantsStyles = { [key in StyleVariants]?: ReactNativeStyle };

export type AnimationConfiguration = {};

export type AnimationsStyle = { animation?: AnimationConfiguration };

export type PlatformVariantStyle = MediaStyles & VariantsStyles & AnimationsStyle;

export type ComputedTailwindReactNativeStyles = {
  [key in PlatformVariant]?: PlatformVariantStyle;
};

export type TailwindReactNativeStyle = { __?: ComputedTailwindReactNativeStyles };
