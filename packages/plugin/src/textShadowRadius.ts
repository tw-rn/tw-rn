export default ({ addUtilities, e, theme, variants }: any) => {
  const textShadowRadius = theme("textShadowRadius") || {};

  const generator = (modifier: string, value: string) => ({
    [`.text-shadow-radius${e(modifier)}`]: { "text-shadow-radius": value },
  });

  const utilities = Object.entries(textShadowRadius as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      return { ...acc, ...generator(modifier === "default" ? "" : `-${modifier}`, value) };
    },
    {}
  );

  addUtilities(utilities, variants("textShadowRadius"));
};
