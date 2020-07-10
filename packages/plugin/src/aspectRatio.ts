export default ({ addUtilities, e, theme, variants }: any) => {
  const aspectRatio = theme("aspectRatio") || {};

  const utilities = Object.entries(aspectRatio).reduce((acc, [modifier, value]) => {
    return { ...acc, [`.ratio-${e(modifier)}`]: { "aspect-ratio": value } };
  }, {});

  addUtilities(utilities, variants("aspectRatio"));
};
