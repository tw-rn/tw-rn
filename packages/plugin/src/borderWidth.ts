export default ({ addUtilities, e, theme, variants }: any) => {
  const borderWidth = theme("borderWidth") || {};
  const platform = theme("platform") || "react-native";

  const reactGenerator = (modifier: string, value: string) => ({
    [`.${e(`border${modifier}`)}`]: { borderWidth: `${value}` },
    [`.${e(`border-t${modifier}`)}`]: { borderTopWidth: `${value}` },
    [`.${e(`border-r${modifier}`)}`]: { borderRightWidth: `${value}` },
    [`.${e(`border-b${modifier}`)}`]: { borderBottomWidth: `${value}` },
    [`.${e(`border-l${modifier}`)}`]: { borderLeftWidth: `${value}` },
  });

  const reactNativeGenerator = (modifier: string, value: string) => ({
    [`.${e(`border${modifier}`)}`]: { borderWidth: `${value}` },
    [`.${e(`border-t${modifier}`)}`]: { borderTopWidth: `${value}` },
    [`.${e(`border-r${modifier}`)}`]: { borderRightWidth: `${value}` },
    [`.${e(`border-b${modifier}`)}`]: { borderBottomWidth: `${value}` },
    [`.${e(`border-l${modifier}`)}`]: { borderLeftWidth: `${value}` },
    [`.${e(`border-s${modifier}`)}`]: { borderStartWidth: `${value}` },
    [`.${e(`border-e${modifier}`)}`]: { borderEndWidth: `${value}` },
  });

  const utilities = Object.entries(borderWidth as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      const generator = platform === "react" ? reactGenerator : reactNativeGenerator;
      return { ...acc, ...generator(modifier === "default" ? "" : `-${modifier}`, value) };
    },
    {}
  );

  addUtilities(utilities, variants("borderWidth"));
};
