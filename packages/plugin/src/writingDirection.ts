export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".text-ltr": { "writing-direction": "ltr" },
      ".text-rtl": { "writing-direction": "rtl" },
      ".text-direction-auto": { "writing-direction": "auto" },
    },
    variants("writingDirection")
  );
};
