export default ({ addUtilities, e, theme, variants }: any) => {
  const textShadowOffset = theme("textShadowOffset") || {};

  const generator = (modifier: string, value: string) => ({
    [`.text-shadow${e(modifier)}`]: { "text-shadow-offset": value },
  });

  const utilities = Object.entries(textShadowOffset as { [key: string]: string }).reduce(
    (acc, [modifier, value]) => {
      return { ...acc, ...generator(modifier === "default" ? "" : `-${modifier}`, value) };
    },
    {}
  );

  addUtilities(utilities, variants("textShadowOffset"));
};
