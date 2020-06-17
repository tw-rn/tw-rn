import { ViewStyle, TextStyle, ImageStyle, StyleProp, ViewProps } from "react-native";

declare global {
  namespace NodeJS {
    interface Global {
      __TAILWINDCSS_NATIVE_STYLES__:
        | {
            [key: string]: { [styleName: string]: { [styleProp: string]: number | string } };
          }
        | undefined;
    }
  }
}

export type NamedStyles = { [P: string]: ViewStyle | TextStyle | ImageStyle };

export interface TailWindViewStyle extends ViewStyle, TailwindStyle {}

export type Style =
  | StyleProp<ViewStyle & TailwindStyle>
  | StyleProp<TextStyle & TailwindStyle>
  | StyleProp<ImageStyle & TailwindStyle>;

// | TextStyle | ImageStyle | TailwindStyles

export const plaformDefaultVariant = "native";

export const platforVariants = <const>[plaformDefaultVariant, "web", "ios", "android"];

// export const focusVariant = "focus";

// export const hoverVariant = "hover";

// export type MediaVariant = "media";

// export const supportedVariants = <const>[...platforVariants, focusVariant, hoverVariant];

// export type VariantType = typeof supportedVariants[number];

export enum Variant {
  Focus = "focus",
  Hover = "hover",
}

export interface TailwindStyle {
  media?: { [key: string]: ViewStyle | TextStyle | ImageStyle };
}

// export type TailwindStyles =
//   // {
//   //   [key in Variant]?: any[];
//   // } &
//   {
//     media: { [key: string]: any[] };
//   };
