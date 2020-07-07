import merge from "deepmerge";
import memoize from "fast-memoize";
import {
  Variants,
  TailwindReactNativeStyle,
  ReactNativeStyle,
  StyleVariants,
  ComputedTailwindReactNativeStyles,
  platformVariants,
  Tw,
} from "./types";

const platforVariantRegex = new RegExp(`^(${platformVariants.join("|")})?:?([:a-zA-Z_0-9-]+)$`);

const styleVariants: StyleVariants[] = [
  Variants.Landscape,
  Variants.Portrait,
  Variants.Focus,
  Variants.Active,
  Variants.Hover,
  Variants.Disabled,
  Variants.Visited,
  Variants.Keyboard,
];

const styleVariantRegex = new RegExp(`^(${styleVariants.join("|")})?:?([:a-zA-Z_0-9-]+)$`);

const stylesEntries = Object.entries(global.__TW_RN_STYLES__ || []);

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

export const generate = memoize(
  (styleNames: string[]): TailwindReactNativeStyle => {
    if (typeof global.__TW_RN_STYLES__ === "undefined") return {};

    const generated = styleNames.reduce<ComputedTailwindReactNativeStyles>(
      (acc, styleName) => {
        // Check for platform variants
        const platformRegExpExecArray = platforVariantRegex.exec(styleName);

        if (!platformRegExpExecArray) return acc;

        const [, platform = "native", platformStylesName] = platformRegExpExecArray;

        // Check for style variants
        const styleRegExpExecArray = styleVariantRegex.exec(platformStylesName);

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
  }
);

const mergeStyles = memoize(
  (stylesArray: TemplateStringsArray, ...variables: string[]) => {
    return stylesArray
      .map((chunk, index) => `${chunk}${variables[index] || ""}`)
      .join("")
      .replace(/\s{2,}/g, " ")
      .split(" ")
      .filter(Boolean);
  },
  {
    strategy: memoize.strategies.variadic,
  }
);

const checkForTailwindStylePresence = () => {
  if (typeof global.__TW_RN_STYLES__ === "undefined") {
    __DEV__ &&
      console.warn(
        `Tailwind styles not found. You might be missing installations steps: http://localhost:3000/tw-rn/docs/fundamentals/getting-started`
      );
    return false;
  }
  return true;
};

const twFunction = (
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): TailwindReactNativeStyle => {
  if (!checkForTailwindStylePresence()) return {};
  return generate(mergeStyles(stylesArray, ...variables));
};

twFunction.raw = memoize(
  (stylesArray: TemplateStringsArray, ...variables: string[]) => {
    if (!checkForTailwindStylePresence()) return;
    return generate(mergeStyles(stylesArray, ...variables)).__?.native?.media?.[""];
  },
  {
    strategy: memoize.strategies.variadic,
  }
);

twFunction.value = memoize(
  (stylesArray: TemplateStringsArray, ...variables: string[]) => {
    if (!checkForTailwindStylePresence()) return;

    const generated = Object.values(
      generate(mergeStyles(stylesArray, ...variables)).__?.native?.media?.[""] || {}
    );

    return generated.length === 0 ? undefined : generated.length === 1 ? generated[0] : generated;
  },
  {
    strategy: memoize.strategies.variadic,
  }
);

export const tw: Tw = twFunction;
