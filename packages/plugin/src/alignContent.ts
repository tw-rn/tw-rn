export default ({ addUtilities, e, theme, variants, target }: any) => {
  const reactNative = {
    ".content-center": { "align-content": "center" },
    ".content-start": { "align-content": "flex-start" },
    ".content-end": { "align-content": "flex-end" },
    ".content-stretch": { "align-content": "stretch" },
    ".content-between": { "align-content": "space-between" },
    ".content-around": { "align-content": "space-around" },
  };

  const react = {
    ".content-center": { "align-content": "center" },
    ".content-start": { "align-content": "flex-start" },
    ".content-end": { "align-content": "flex-end" },
    ".content-between": { "align-content": "space-between" },
    ".content-around": { "align-content": "space-around" },
  };

  const platform = theme("platform") || "react-native";
  addUtilities(platform === "react" ? react : reactNative, variants("display"));
};
