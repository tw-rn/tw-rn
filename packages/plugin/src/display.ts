export default ({ addUtilities, e, theme, variants, target }: any) => {
  const platform = theme("platform") || "react-native";

  const reactNative = {
    ".flex": { display: "flex" },
    ".hidden": { display: "none" },
  };

  const react = {
    ".block": {
      display: "block",
    },
    ".inline-block": { display: "inline-block" },
    ".inline": { display: "inline" },
    ".flex": { display: "flex" },
    ".inline-flex": { display: "inline-flex" },
    ".table": { display: "table" },
    ".table-caption": { display: "table-caption" },
    ".table-cell": { display: "table-cell" },
    ".table-column": { display: "table-column" },
    ".table-column-group": { display: "table-column-group" },
    ".table-footer-group": { display: "table-footer-group" },
    ".table-header-group": { display: "table-header-group" },
    ".table-row-group": { display: "table-row-group" },
    ".table-row": { display: "table-row" },
    ...(target("display") === "ie11"
      ? {}
      : {
          ".flow-root": { display: "flow-root" },
          ".grid": { display: "grid" },
          ".inline-grid": { display: "inline-grid" },
        }),
    ".hidden": { display: "none" },
  };

  addUtilities(platform === "react" ? react : reactNative, variants("display"));
};
