import merge from "deepmerge";
import memoize from "fast-memoize";
import { Variant, TailwindStyle } from "./types";

const styles = global.__TAILWINDCSS_NATIVE_STYLES__;
const styleEntries = Object.entries(styles || []);
const variantRegex = new RegExp(`^(${Object.values(Variant).join("|")}):(.*)$`);

export const generateTailwindStyle = (
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): TailwindStyle => {
  if (typeof styles === "undefined") {
    __DEV__ && console.warn(`Can't find styles. Please include your CSS in your App entry point.`);
    return { media: { "": {} } };
  }

  const computedStyles = stylesArray
    .map((chunk, index) => `${chunk}${variables[index] || ""}`)
    .join("")
    .replace(/\s{2,}/g, " ")
    .split(" ")
    .filter(Boolean);

  const initial: TailwindStyle = {
    media: {},
    // hover: [],
    // focus: [],
  };

  const tailwindStyle = computedStyles.reduce<TailwindStyle>(
    (acc, computedStyle) => {
      const [, variant, variantStyleName] = variantRegex.exec(computedStyle) || [];

      // Check if is a variant
      if (variant) {
      }

      const media = styleEntries.reduce((acc, [media, styles]) => {
        const name = computedStyle.replace(":", "\\:");
        const style = styles[name];

        if (!style) {
          return acc;
        }

        return merge(acc, { [media]: style });
      }, {});

      return merge(acc, { media });
    },
    { media: { "": {} } }
  );

  // console.log({ tailwindStyle });

  // sm: -> get the
  // const mediaStyles = screens.reduce<Partial<TailwindStyle>>((acc, screen) => {

  //   return acc;
  // }, {});

  // const twStyles = {
  //   media: {
  //     // sm: {...}
  //   },
  //   hover: {},
  //   focus: {},
  // };

  // const tailwindNativeStyles = computedStyles.reduce((acc, computedStyle) => {
  //   return acc;
  // }, {});
  // const tailwindNativeStyles = computedStyles.reduce((acc, computedStyle) => {
  //   // Check if is has a variant
  //   const [, variant, styleName] = /^(\w+):(.*)/.exec(computedStyle) || [];

  //   // No variant found
  //   if (!variant) {
  //     const { mediaQuery, stylesheet } = styles[""];

  //     if (stylesheet[computedStyle]) {
  //       return merge(acc, { [""]: { mediaQuery, styles: [stylesheet[computedStyle]] } });
  //     } else {
  // __DEV__ && console.warn(`Invalid style ${computedStyle}`);
  //       return acc;
  //     }
  //   }

  //   return acc;

  // }, {});

  // const mappedStyle = styles[computedStyle];

  // if (!mappedStyle) {
  //   // Check if is a valid variant
  //   const [, variant, styleName] = variantRegex.exec(computedStyle) || [];

  //   if (!variant) {
  // __DEV__ && console.warn(`Invalid style or variant ${computedStyle}`);
  // return acc;
  //   }

  //   if (typeof styles[styleName] === "undefined") {
  //     __DEV__ && console.warn(`Style not found: ${styleName}`);
  //     return acc;
  //   }

  //   const variantStyle = styles[styleName];

  //   return [...acc, [variant, variantStyle]];
  // }

  // return [...acc, mappedStyle];

  // console.log({ tailwindNativeStyles });
  // return tailwindNativeStyles;
  // console.log({ tailwindStyle });

  return tailwindStyle;
};

// const serializer = (...arg: any) => {
//   console.log({ arg });
//   return "1";
// };

export const tw = memoize(generateTailwindStyle, { strategy: memoize.strategies.variadic });
