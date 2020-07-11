export default ({ addUtilities, e, theme, variants }: any) => {
  const padding = theme("padding") || {};
  const platform = theme("platform") || "react-native";

  const reactGenerator = (modifier: string, value: string) => ({
    [`.${e(`p-${modifier}`)}`]: { padding: `${value}` },
    [`.${e(`py-${modifier}`)}`]: { "padding-top": `${value}`, "padding-bottom": `${value}` },
    [`.${e(`px-${modifier}`)}`]: { "padding-left": `${value}`, "padding-right": `${value}` },
    [`.${e(`pt-${modifier}`)}`]: { "padding-top": `${value}` },
    [`.${e(`pr-${modifier}`)}`]: { "padding-right": `${value}` },
    [`.${e(`pb-${modifier}`)}`]: { "padding-bottom": `${value}` },
    [`.${e(`pl-${modifier}`)}`]: { "padding-left": `${value}` },
  });

  const reactNativeGenerator = (modifier: string, value: string) => ({
    [`.${e(`p-${modifier}`)}`]: { padding: `${value}` },
    [`.${e(`py-${modifier}`)}`]: { "padding-top": `${value}`, "padding-bottom": `${value}` },
    [`.${e(`px-${modifier}`)}`]: { "padding-left": `${value}`, "padding-right": `${value}` },
    [`.${e(`pt-${modifier}`)}`]: { "padding-top": `${value}` },
    [`.${e(`pr-${modifier}`)}`]: { "padding-right": `${value}` },
    [`.${e(`pb-${modifier}`)}`]: { "padding-bottom": `${value}` },
    [`.${e(`pl-${modifier}`)}`]: { "padding-left": `${value}` },
    [`.${e(`ps-${modifier}`)}`]: { "padding-start": `${value}` },
    [`.${e(`pe-${modifier}`)}`]: { "padding-end": `${value}` },
  });

  const utilities = Object.entries(padding as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      const generator = platform === "react" ? reactGenerator : reactNativeGenerator;
      return { ...acc, ...generator(modifier, value) };
    },
    {}
  );

  addUtilities(utilities, variants("padding"));
};
