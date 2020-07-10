export default ({ addUtilities, e, theme, variants, target }: any) => {
  const reactNative = {
    ".self-auto": { "align-self": "auto" },
    ".self-start": { "align-self": "flex-start" },
    ".self-end": { "align-self": "flex-end" },
    ".self-center": { "align-self": "center" },
    ".self-stretch": { "align-self": "stretch" },
    ".self-baseline": { "align-self": "baseline" },
  };

  const react = {
    ".self-auto": { "align-self": "auto" },
    ".self-start": { "align-self": "flex-start" },
    ".self-end": { "align-self": "flex-end" },
    ".self-center": { "align-self": "center" },
    ".self-stretch": { "align-self": "stretch" },
  };

  const platform = theme("platform") || "react-native";
  addUtilities(platform === "react" ? react : reactNative, variants("display"));
};
