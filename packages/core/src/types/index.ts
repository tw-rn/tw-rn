import { TargetedEvent, NativeSyntheticEvent, StyleProp } from "react-native";

declare global {
  namespace NodeJS {
    interface Global {
      __TW_RN_STYLES__:
        | {
            [key: string]: {
              [styleName: string]: { [styleProp: string]: number | string };
            };
          }
        | undefined;
    }
  }
}

export enum Variants {
  Common = "common",
  Native = "native",
  Web = "web",
  Ios = "ios",
  Android = "android",
  Media = "media",
  Portrait = "portrait",
  Landscape = "landscape",
  Focus = "focus",
  Active = "active",
  Hover = "hover",
  Disabled = "disabled",
  Visited = "visited",
  Keyboard = "keyboard",
}

export const DefaultPlatformVariant = Variants.Common;

export type PlatformVariant =
  | Variants.Common
  | Variants.Native
  | Variants.Web
  | Variants.Ios
  | Variants.Android;

export const platformVariants: PlatformVariant[] = [
  Variants.Common,
  Variants.Native,
  Variants.Web,
  Variants.Ios,
  Variants.Android,
];

export type StyleVariants =
  | Variants.Landscape
  | Variants.Portrait
  | Variants.Focus
  | Variants.Active
  | Variants.Hover
  | Variants.Disabled
  | Variants.Visited
  | Variants.Keyboard;

export type StyleValue = string | number | boolean | object | undefined;

export type Style = { [style: string]: StyleValue };

export type MediaStyles = {
  [Variants.Media]?: { [media: string]: Style };
};

export type VariantsStyles = { [key in StyleVariants]?: any };

export type PlatformVariantStyle = MediaStyles & VariantsStyles;

export type ComputedTailwindReactNativeStyles = {
  [key in PlatformVariant]?: PlatformVariantStyle;
};

export type TailwindReactNativeStyle = {
  __?: ComputedTailwindReactNativeStyles;
};

export type TailwindReactNativeStyleProps<P, O extends keyof P> = {
  [key in O]?: StyleProp<TailwindReactNativeStyle & P[O]>;
} &
  Omit<P, O>;

export type VariantsProps = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
};

export interface Tw {
  (
    stylesArray: TemplateStringsArray,
    ...variables: string[]
  ): TailwindReactNativeStyle;
  /**
   * Gets the raw styles from Tailwind
   *
   * ```js
   * tw.raw`bg-white` // yields { backgroundColor: '#ffffff' }
   * ```
   */
  raw: (
    stylesArray: TemplateStringsArray,
    ...variables: string[]
  ) => Style | undefined;
  /**
   * Gets the value or values of a Tailwind style
   *
   * ```js
   * tw.value`bg-white` // yields "#ffffff"
   * ```
   */
  value: (
    stylesArray: TemplateStringsArray,
    ...variables: string[]
  ) => StyleValue | StyleValue[];
}
