import merge from "deepmerge";
import memoize from "fast-memoize";
import {
  Variants,
  TailwindReactNativeStyle,
  ReactNativeStyle,
  StyleVariants,
  ComputedTailwindReactNativeStyles,
  platformVariants,
} from "./types";

const styles = global.__TW_RN_STYLES__;

const platforVariantRegex = new RegExp(`^(${platformVariants.join("|")})?:?([:a-zA-Z_0-9-]+)$`);

const styleVariants: StyleVariants[] = [
  Variants.Landscape,
  Variants.Focus,
  Variants.Active,
  Variants.Hover,
  Variants.Disabled,
  Variants.Visited,
  Variants.Keyboard,
];

const styleVariantRegex = new RegExp(`^(${styleVariants.join("|")})?:?([:a-zA-Z_0-9-]+)$`);

const stylesEntries = Object.entries(styles || []);

const emptyStyles: ComputedTailwindReactNativeStyles = {};

const findStylesWithMedia = (
  styleName: string
): { media: string; style: ReactNativeStyle }[] | undefined => {
  const matchingStyles = stylesEntries.filter(
    ([, styles]) => typeof styles[styleName] !== "undefined"
  );

  if (matchingStyles.length === 0) return;

  return matchingStyles.map(([media, styles]) => ({ media, style: styles[styleName] }));
};

const findStylesWithMediaMemoized = memoize(findStylesWithMedia);

export const generate = (styleNames: string[]): TailwindReactNativeStyle => {
  if (typeof styles === "undefined") return {};

  const generated = styleNames.reduce<ComputedTailwindReactNativeStyles>(
    (acc, styleName) => {
      // Check for platform variants
      const platformRegExpExecArray = platforVariantRegex.exec(styleName);

      if (!platformRegExpExecArray) return acc;

      const [, platform = "native", platformStyleName] = platformRegExpExecArray;

      // Check for style variants
      const styleRegExpExecArray = styleVariantRegex.exec(platformStyleName);

      if (!styleRegExpExecArray) return acc;

      const [, variant = "media", styleStyleName] = styleRegExpExecArray;

      const foundStyles = findStylesWithMediaMemoized(styleStyleName);

      if (!foundStyles) return acc;

      const computedStyles = foundStyles.reduce<ComputedTailwindReactNativeStyles>(
        (acc, { media, style }) => {
          const computed = {
            [platform]:
              variant === "media" ? { [variant]: { [media]: style } } : { [variant]: style },
          };

          return merge(acc, computed);
        },
        {}
      );

      return merge(acc, computedStyles);
    },
    { ...emptyStyles }
  );

  return { __: generated };
};

export const generateTailwindReactNativeStyle = (
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): TailwindReactNativeStyle => {
  if (typeof styles === "undefined") {
    __DEV__ && console.warn(`Can't find styles. Please include your CSS in your App entry point.`);
    return {};
  }

  const mergedStyles = stylesArray
    .map((chunk, index) => `${chunk}${variables[index] || ""}`)
    .join("")
    .replace(/\s{2,}/g, " ")
    .split(" ")
    .filter(Boolean);

  return generate(mergedStyles);
};

export const tw = memoize(generateTailwindReactNativeStyle, {
  strategy: memoize.strategies.variadic,
});
