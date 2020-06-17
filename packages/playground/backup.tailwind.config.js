const { theme, variants } = require("tailwindcss/defaultConfig");

const colors = () => {
  const { current: omit, ...rest } = theme.colors;
  return rest;
};

const flex = { "flex-1": "1" };

const fontFamily = {};

const newVariants = variants; //Object.entries(variants).reduce((acc, [key]) => ({ ...acc, [key]: [] }), {});

module.exports = {
  purge: [],
  theme: {
    colors,
    flex,
    fontFamily,
    extend: {},
  },
  // screens: {},
  variants: newVariants,
  plugins: [],
  // plugins: [require("@tailwindcss/ui")],
  corePlugins: {
    // Layout
    container: true,

    boxShadow: false,
    transitionProperty: false,
    transitionDuration: false,
    transitionTimingFunction: false,
    transitionDelay: false,
    scale: false,
    rotate: false,
    translate: false,
    skew: false,
    transformOrigin: false,
    listStylePosition: false,
    outline: false,
    stroke: false,
    wordBreak: false,
    gridTemplateColumns: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
    gridTemplateRows: false,
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false,
    gap: false,
    gridAutoFlow: false,
    listStyleType: false,
    strokeWidth: false,
    verticalAlign: false,
    accessibility: false,
    appearance: false,
    backgroundAttachment: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    letterSpacing: false,
    space: false,
    divideWidth: false,
    // TODO this is supported in RN but not in the css parser for some reason
    lineHeight: false,
  },
};
