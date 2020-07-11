export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".font-small-caps": { "font-variant": "small-caps" },
      ".font-oldstyle-nums": { "font-variant": "oldstyle-nums" },
      ".font-lining-nums": { "font-variant": "lining-nums" },
      ".font-tabular-nums": { "font-variant": "tabular-nums" },
      ".font-proportional-nums": { "font-variant": "proportional-nums" },
    },

    variants("fontVariant")
  );
};
