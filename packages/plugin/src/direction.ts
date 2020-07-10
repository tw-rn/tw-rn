export default ({ addUtilities, theme, variants }: any) => {
  const reactNative = {
    ".ltr": { direction: "ltr" },
    ".rtl": { direction: "rtl" },
  };

  const react = {};

  const platform = theme("platform") || "react-native";
  addUtilities(platform === "react" ? react : reactNative, variants("direction"));
};
