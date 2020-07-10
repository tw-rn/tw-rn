import prefixNegativeModifiers from "tailwindcss/lib/util/prefixNegativeModifiers";

export default ({ addUtilities, e, theme, variants }: any) => {
  const margin = theme("margin") || {};
  const platform = theme("platform") || "react-native";

  const reactGenerator = (modifier: string, value: string) => ({
    [`.${e(prefixNegativeModifiers("m", modifier))}`]: { margin: `${value}` },
    [`.${e(prefixNegativeModifiers("my", modifier))}`]: {
      "margin-top": `${value}`,
      "margin-bottom": `${value}`,
    },
    [`.${e(prefixNegativeModifiers("mx", modifier))}`]: {
      "margin-left": `${value}`,
      "margin-right": `${value}`,
    },
    [`.${e(prefixNegativeModifiers("mt", modifier))}`]: { "margin-top": `${value}` },
    [`.${e(prefixNegativeModifiers("mr", modifier))}`]: { "margin-right": `${value}` },
    [`.${e(prefixNegativeModifiers("mb", modifier))}`]: { "margin-bottom": `${value}` },
    [`.${e(prefixNegativeModifiers("ml", modifier))}`]: { "margin-left": `${value}` },
  });

  const reactNativeGenerator = (modifier: string, value: string) => ({
    [`.${e(prefixNegativeModifiers("m", modifier))}`]: { margin: `${value}` },
    [`.${e(prefixNegativeModifiers("my", modifier))}`]: {
      "margin-top": `${value}`,
      "margin-bottom": `${value}`,
    },
    [`.${e(prefixNegativeModifiers("mx", modifier))}`]: {
      "margin-left": `${value}`,
      "margin-right": `${value}`,
    },
    [`.${e(prefixNegativeModifiers("mt", modifier))}`]: { "margin-top": `${value}` },
    [`.${e(prefixNegativeModifiers("mr", modifier))}`]: { "margin-right": `${value}` },
    [`.${e(prefixNegativeModifiers("mb", modifier))}`]: { "margin-bottom": `${value}` },
    [`.${e(prefixNegativeModifiers("ml", modifier))}`]: { "margin-left": `${value}` },
    [`.${e(prefixNegativeModifiers("ms", modifier))}`]: { "margin-start": `${value}` },
    [`.${e(prefixNegativeModifiers("me", modifier))}`]: { "margin-end": `${value}` },
  });

  const utilities = Object.entries(margin as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      const generator = platform === "react" ? reactGenerator : reactNativeGenerator;
      return { ...acc, ...generator(modifier, value) };
    },
    {}
  );

  addUtilities(utilities, variants("margin"));
};
