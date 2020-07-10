import prefixNegativeModifiers from "tailwindcss/lib/util/prefixNegativeModifiers";

export default ({ addUtilities, e, theme, variants }: any) => {
  const inset = theme("inset") || {};
  const platform = theme("platform") || "react-native";

  const reactGenerator = (modifier: string, value: string) => ({
    [`.${e(prefixNegativeModifiers("inset", modifier))}`]: {
      top: `${value}`,
      right: `${value}`,
      bottom: `${value}`,
      left: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("inset-y", modifier))}`]: {
      top: `${value}`,
      bottom: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("inset-x", modifier))}`]: {
      right: `${value}`,
      left: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("top", modifier))}`]: { top: `${value}` },
    [`.${e(prefixNegativeModifiers("right", modifier))}`]: { right: `${value}` },
    [`.${e(prefixNegativeModifiers("bottom", modifier))}`]: { bottom: `${value}` },
    [`.${e(prefixNegativeModifiers("left", modifier))}`]: { left: `${value}` },
  });

  const reactNativeGenerator = (modifier: string, value: string) => ({
    [`.${e(prefixNegativeModifiers("inset", modifier))}`]: {
      top: `${value}`,
      right: `${value}`,
      bottom: `${value}`,
      left: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("inset-y", modifier))}`]: {
      top: `${value}`,
      bottom: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("inset-x", modifier))}`]: {
      right: `${value}`,
      left: `${value}`,
    },
    [`.${e(prefixNegativeModifiers("top", modifier))}`]: { top: `${value}` },
    [`.${e(prefixNegativeModifiers("right", modifier))}`]: { right: `${value}` },
    [`.${e(prefixNegativeModifiers("bottom", modifier))}`]: { bottom: `${value}` },
    [`.${e(prefixNegativeModifiers("left", modifier))}`]: { left: `${value}` },
    [`.${e(prefixNegativeModifiers("start", modifier))}`]: { left: `${value}` },
    [`.${e(prefixNegativeModifiers("end", modifier))}`]: { left: `${value}` },
  });

  const utilities = Object.entries(inset as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      const generator = platform === "react" ? reactGenerator : reactNativeGenerator;
      return { ...acc, ...generator(modifier, value) };
    },
    {}
  );

  addUtilities(utilities, variants("inset"));
};
