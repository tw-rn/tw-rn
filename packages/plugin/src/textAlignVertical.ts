export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".text-auto": { "text-align-vertical": "auto" },
      ".text-top": { "text-align-vertical": "top" },
      ".text-bottom": { "text-align-vertical": "bottom" },
      ".text-middle": { "text-align-vertical": "center" },
    },
    variants("textAlignVertical")
  );
};
