export default ({ addUtilities, e, theme, variants, target }: any) => {
  const reactNative = {
    ".underline": {
      "text-decoration-line": "underline",
      "text-decoration-style": "solid",
      "text-decoration-color": "black",
    },
    ".line-through": {
      "text-decoration-line": "line-through",
      "text-decoration-style": "solid",
      "text-decoration-color": "black",
    },
    ".no-underline": {
      "text-decoration-line": "none",
      "text-decoration-style": "solid",
      "text-decoration-color": "black",
    },
    //
    ".underline-double": {
      "text-decoration-line": "underline",
      "text-decoration-style": "double",
      "text-decoration-color": "black",
    },
    ".line-through-double": {
      "text-decoration-line": "line-through",
      "text-decoration-style": "double",
      "text-decoration-color": "black",
    },
    //
    ".underline-dotted": {
      "text-decoration-line": "underline",
      "text-decoration-style": "dotted",
      "text-decoration-color": "black",
    },
    ".line-through-dotted": {
      "text-decoration-line": "line-through",
      "text-decoration-style": "dotted",
      "text-decoration-color": "black",
    },
    //
    ".underline-dashed": {
      "text-decoration-line": "underline",
      "text-decoration-style": "dashed",
      "text-decoration-color": "black",
    },
    ".line-through-dashed": {
      "text-decoration-line": "line-through",
      "text-decoration-style": "dashed",
      "text-decoration-color": "black",
    },
  };

  const react = {
    ".underline": { "text-decoration": "underline" },
    ".line-through": { "text-decoration": "line-through" },
    ".no-underline": { "text-decoration": "none" },
  };

  const platform = theme("platform") || "react-native";
  addUtilities(platform === "react" ? react : reactNative, variants("display"));
};
