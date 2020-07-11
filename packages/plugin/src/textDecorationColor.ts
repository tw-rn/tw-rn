import flattenColor from "./util/flattenColor";

export default ({ addUtilities, e, theme, variants }: any) => {
  const textDecorationColor = theme("textDecorationColor") || {};
  const colors = flattenColor(textDecorationColor);

  const utilities = Object.entries(colors).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.text-decoration-${e(modifier)}`]: { "text-decoration-color": value } };
  }, {});

  addUtilities(utilities, variants("textDecorationColor"));
};
