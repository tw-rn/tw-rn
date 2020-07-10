export default ({ addUtilities, e, theme, variants }: any) => {
  const flex = theme("flex") || {};

  const utilities = Object.entries(flex).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.flex-${e(modifier)}`]: { flex: value } };
  }, {});

  addUtilities(utilities, variants("flex"));
};
