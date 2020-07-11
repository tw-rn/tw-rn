export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".backface-visible": { "backface-visibility": "visible" },
      ".backface-hidden": { "backface-visibility": "hidden" },
    },
    variants("backfaceVisibility")
  );
};
