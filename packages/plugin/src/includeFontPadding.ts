export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".font-padding": { "include-font-padding": "true" },
      ".font-padding-none": { "include-font-padding": "false" },
    },
    variants("includeFontPadding")
  );
};
