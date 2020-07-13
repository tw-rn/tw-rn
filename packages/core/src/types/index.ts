import { TargetedEvent, NativeSyntheticEvent } from "react-native";

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

export enum Variants {
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
  | Variants.Portrait
  | Variants.Focus
  | Variants.Active
  | Variants.Hover
  | Variants.Disabled
  | Variants.Visited
  | Variants.Keyboard;

export const transitions = <const>[
  "transition-none",
  "transition-all",
  "transition",
  "transition-colors",
  "transition-opacity",
  "transition-shadow",
  "transition-transform",
];

export type TransitionType = typeof transitions[number];

export type StyleValue = string | number | boolean | undefined;

export type Style = { [style: string]: StyleValue };

export type MediaStyles = {
  [Variants.Media]?: { [media: string]: Style };
};

export type VariantsStyles = { [key in StyleVariants]?: any };

export type AnimationConfiguration = {
  transitionType?: TransitionType;
  duration?: number;
  easing?: any;
  delay?: number;
};

export type AnimationsStyle = { animation?: AnimationConfiguration };

export type PlatformVariantStyle = MediaStyles & VariantsStyles & AnimationsStyle;

export type ComputedTailwindReactNativeStyles = {
  [key in PlatformVariant]?: PlatformVariantStyle;
};

export type TailwindReactNativeStyle = { __?: ComputedTailwindReactNativeStyles };

export type VariantsProps = {
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
};

export interface Tw {
  (stylesArray: TemplateStringsArray, ...variables: string[]): TailwindReactNativeStyle;
  /**
   * Gets the raw styles from Tailwind
   *
   * ```js
   * tw.raw`bg-white` // yields { backgroundColor: '#ffffff' }
   * ```
   */
  raw: (stylesArray: TemplateStringsArray, ...variables: string[]) => Style | undefined;
  /**
   * Gets the value or values of a Tailwind style
   *
   * ```js
   * tw.value`bg-white` // yields "#ffffff"
   * ```
   */
  value: (stylesArray: TemplateStringsArray, ...variables: string[]) => StyleValue | StyleValue[];
}
