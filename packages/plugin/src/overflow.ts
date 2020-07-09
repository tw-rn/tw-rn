export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".overflow-hidden": { overflow: "hidden" },
      ".overflow-visible": { overflow: "visible" },
      ".overflow-scroll": { overflow: "scroll" },
    },
    variants("overflow")
  );
};
