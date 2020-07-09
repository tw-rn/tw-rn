export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".text-left": { "text-align": "left" },
      ".text-center": { "text-align": "center" },
      ".text-right": { "text-align": "right" },
    },
    variants("textAlign")
  );
};
