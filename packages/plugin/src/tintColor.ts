import flattenColor from "./util/flattenColor";

export default ({ addUtilities, e, theme, variants }: any) => {
  const tintColor = theme("tintColor") || {};
  const colors = flattenColor(tintColor);

  const utilities = Object.entries(colors).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.tint-${e(modifier)}`]: { "tint-color": value } };
  }, {});

  addUtilities(utilities, variants("tintColor"));
};
