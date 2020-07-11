export default ({ addUtilities, variants }: any) => {
  addUtilities(
    {
      ".resize-cover": { "resize-mode": "cover" },
      ".resize-contain": { "resize-mode": "contain" },
      ".resize-stretch": { "resize-mode": "stretch" },
      ".resize-repeat": { "resize-mode": "repeat" },
      ".resize-center": { "resize-mode": "center" },
    },
    variants("resizeMode")
  );
};
