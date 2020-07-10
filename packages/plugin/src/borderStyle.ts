export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".border-solid": { "border-style": "solid" },
      ".border-dashed": { "border-style": "dashed" },
      ".border-dotted": { "border-style": "dotted" },
    },
    variants("borderStyle")
  );
};
