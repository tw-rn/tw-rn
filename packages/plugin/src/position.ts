export default ({ addUtilities, e, theme, variants, target }: any) => {
  const reactNative = {
    ".absolute": { position: "absolute" },
    ".relative": { position: "relative" },
  };

  const react = {
    ".static": { position: "static" },
    ".fixed": { position: "fixed" },
    ".absolute": { position: "absolute" },
    ".relative": { position: "relative" },
    ...(target("position") === "ie11"
      ? {}
      : {
          ".sticky": {
            position: "sticky",
          },
        }),
  };

  const platform = theme("platform") || "react-native";
  addUtilities(platform === "react" ? react : reactNative, variants("display"));
};
