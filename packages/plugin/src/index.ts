import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";
import defaultConfig from "tailwindcss/defaultConfig";
import displayPlugin from "./display";
import overflowPlugin from "./overflow";
import positionPlugin from "./position";
import textAlignPlugin from "./textAlign";
import borderStylePlugin from "./borderStyle";
import alignContentPlugin from "./alignContent";
import alignSelfPlugin from "./alignSelf";
import aspectRatioPlugin from "./aspectRatio";
import borderWidthPlugin from "./borderWidth";
import directionPlugin from "./direction";
import insetPlugin from "./inset";
import flexPlugin from "./flex";
import flexBasisPlugin from "./flexBasis";
import marginPlugin from "./margin";
import paddingPlugin from "./padding";
import textShadowOffsetPlugin from "./textShadowOffset";
import backfaceVisibilityPlugin from "./backfaceVisibility";
import resizeModePlugin from "./resizeMode";
import tintColorPlugin from "./tintColor";
import overlayColorPlugin from "./overlayColor";
import textShadowColorPlugin from "./textShadowColor";
import textShadowRadiusPlugin from "./textShadowRadius";
import includeFontPaddingPlugin from "./includeFontPadding";
import textAlignVerticalPlugin from "./textAlignVertical";
import fontVariantPlugin from "./fontVariant";
import textDecorationColorPlugin from "./textDecorationColor";
import textDecorationPlugin from "./textDecoration";
import writingDirectionPlugin from "./writingDirection";

const variants = Object.keys(defaultConfig.variants).reduce(
  (acc, v) => ({ ...acc, [v]: ["responsive"] }),
  {}
);

const corePlugins = {
  accessibility: false,
  alignContent: false,
  alignSelf: false,
  appearance: false,
  backgroundAttachment: false,
  backgroundOpacity: false,
  backgroundPosition: false,
  backgroundRepeat: false,
  backgroundSize: false,
  borderCollapse: false,
  borderOpacity: false,
  borderStyle: false,
  borderWidth: false,
  display: false,
  divideColor: false,
  divideOpacity: false,
  divideWidth: false,
  fill: false,
  flex: false,
  float: false,
  clear: false,
  fontSmoothing: false,
  inset: false,
  listStylePosition: false,
  listStyleType: false,
  margin: false,
  objectFit: false,
  objectPosition: false,
  order: false,
  outline: false,
  overflow: false,
  padding: false,
  placeholderColor: false,
  placeholderOpacity: false,
  pointerEvents: false,
  position: false,
  resize: false,
  space: false,
  stroke: false,
  strokeWidth: false,
  tableLayout: false,
  textAlign: false,
  textOpacity: false,
  verticalAlign: false,
  visibility: false,
  whitespace: false,
  wordBreak: false,
  gap: false,
  gridAutoFlow: false,
  gridTemplateColumns: false,
  gridColumn: false,
  gridColumnStart: false,
  gridColumnEnd: false,
  gridTemplateRows: false,
  gridRow: false,
  gridRowStart: false,
  gridRowEnd: false,
  transform: false,
  transformOrigin: false,
  scale: false,
  rotate: false,
  translate: false,
  skew: false,
  textDecoration: false,
};

const flex = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
};

const { auto: insetAuto, ...inset } = defaultTheme.inset;

const { auto: zIndexAuto, ...zIndex } = defaultTheme.zIndex;

const margin = (theme: any, { negative }: any) => ({
  ...theme("spacing"),
  ...negative(theme("spacing")),
});

const width = (theme: any) => ({
  ...theme("spacing"),
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
});

const maxWidth = (theme: any, { breakpoints }: any) => ({
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  full: "100%",
  ...breakpoints(theme("screens")),
});

const height = (theme: any) => ({
  ...theme("spacing"),
  full: "100%",
});

const minHeight = {
  "0": "0",
  full: "100%",
};

const maxHeight = {
  full: "100%",
};

const letterSpacing = {};

const lineHeight = {
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
};

const { current: colorCurrent, ...colors } = defaultTheme.colors;

const { inner: boxShadowInner, ...boxShadow } = defaultTheme.boxShadow;

const aspectRatio = { "1": "1" };

const flexBasis = (theme: any) => ({
  ...theme("spacing"),
});

const textShadowOffset = {
  sm: "0px 1px",
  default: "0px 2px",
  md: "0px 4px",
  lg: "0px 10px",
  xl: "0px 20px",
  "2xl": "0px 25px",
  none: "0px 0px",
};

const fontFamily = {};

const tintColor = (theme: any) => ({
  ...theme("colors"),
});

const overlayColor = (theme: any) => ({
  ...theme("colors"),
});

const textShadowColor = (theme: any) => ({
  ...theme("colors"),
});

const textShadowRadius = {
  sm: "1px",
  default: "2px",
  md: "4px",
  lg: "10px",
  xl: "20px",
  "2xl": "25px",
  none: "0px",
};

const textDecorationColor = (theme: any) => ({
  ...theme("colors"),
});

const reactNativeConfig = (options: any = {}) => {
  return {
    theme: {
      platform: "react-native",
      inset,
      zIndex,
      margin,
      width,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      letterSpacing,
      lineHeight,
      colors,
      boxShadow,
      aspectRatio,
      flex,
      flexBasis,
      textShadowOffset,
      fontFamily,
      tintColor,
      overlayColor,
      textShadowColor,
      textShadowRadius,
      textDecorationColor,
    },
    corePlugins: {
      ...corePlugins,
      boxSizing: false,
      cursor: false,
      userSelect: false,
    },
    variants,
  };
};

const reactNativeWebConfig = (options: any = {}) => {
  return {
    theme: {
      platform: "react",
      inset,
      zIndex,
      margin,
      width,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      letterSpacing,
      lineHeight,
      colors,
      boxShadow,
      flex,
      fontFamily,
    },
    corePlugins,
    variants,
  };
};

export = plugin.withOptions(
  () => {
    return (options: any) => {
      alignContentPlugin(options);
      alignSelfPlugin(options);
      aspectRatioPlugin(options);
      borderWidthPlugin(options);
      displayPlugin(options);
      overflowPlugin(options);
      positionPlugin(options);
      textAlignPlugin(options);
      borderStylePlugin(options);
      directionPlugin(options);
      insetPlugin(options);
      flexPlugin(options);
      flexBasisPlugin(options);
      marginPlugin(options);
      paddingPlugin(options);
      textAlignVerticalPlugin(options);
      textDecorationPlugin(options);

      if ((process.env.RN_TW_ENV || "mobile") === "mobile") {
        textShadowOffsetPlugin(options);
        backfaceVisibilityPlugin(options);
        resizeModePlugin(options);
        tintColorPlugin(options);
        overlayColorPlugin(options);
        textShadowColorPlugin(options);
        textShadowRadiusPlugin(options);
        includeFontPaddingPlugin(options);
        fontVariantPlugin(options);
        textDecorationColorPlugin(options);
        writingDirectionPlugin(options);
      }
    };
  },
  (options: any = {}) => {
    return (process.env.RN_TW_ENV || "mobile") === "mobile"
      ? reactNativeConfig(options)
      : reactNativeWebConfig(options);
  }
);
