import flattenColor from "./util/flattenColor";

export default ({ addUtilities, e, theme, variants }: any) => {
  const overlayColor = theme("overlayColor") || {};
  const colors = flattenColor(overlayColor);

  const utilities = Object.entries(colors).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.overlay-${e(modifier)}`]: { "overlay-color": value } };
  }, {});

  addUtilities(utilities, variants("overlayColor"));
};
