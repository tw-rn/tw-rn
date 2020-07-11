import flattenColor from "./util/flattenColor";

export default ({ addUtilities, e, theme, variants }: any) => {
  const textShadowColor = theme("textShadowColor") || {};
  const colors = flattenColor(textShadowColor);

  const utilities = Object.entries(colors).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.text-shadow-${e(modifier)}`]: { "text-shadow-color": value } };
  }, {});

  addUtilities(utilities, variants("textShadowColor"));
};
