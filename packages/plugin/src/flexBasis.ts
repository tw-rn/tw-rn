export default ({ addUtilities, e, theme, variants }: any) => {
  const flexBasis = theme("flexBasis") || {};

  const utilities = Object.entries(flexBasis).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.basis-${e(modifier)}`]: { "flex-basis": value } };
  }, {});

  addUtilities(utilities, variants("flexBasis"));
};
