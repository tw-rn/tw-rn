import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";
import displayPlugin from "./display";
import overflowPlugin from "./overflow";
import positionPlugin from "./position";

const flex = {
  default: "1",
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

const reactNativeConfig = (options: any = {}) => {
  return {
    theme: {
      platform: "react-native",
      inset,
      zIndex,
      // flex,
    },
    corePlugins: { ...corePlugins, boxSizing: false },
  };
};

const reactNativeWebConfig = (options: any = {}) => {
  return {
    theme: {
      platform: "react",
      inset,
      zIndex,
    },
    corePlugins,
  };
};

const corePlugins = {
  accessibility: false,
  alignContent: false,
  alignItems: false,
  alignSelf: false,
  appearance: false,
  backgroundAttachment: false,
  backgroundColor: false,
  backgroundOpacity: false,
  backgroundPosition: false,
  backgroundRepeat: false,
  backgroundSize: false,
  borderCollapse: false,
  borderColor: false,
  borderOpacity: false,
  borderRadius: false,
  borderStyle: false,
  borderWidth: false,
  boxShadow: false,
  // boxSizing: false,
  cursor: false,
  display: false,
  divideColor: false,
  divideOpacity: false,
  divideWidth: false,
  fill: false,
  flex: false,
  flexDirection: false,
  flexGrow: false,
  flexShrink: false,
  flexWrap: false,
  float: false,
  clear: false,
  fontFamily: false,
  fontSize: false,
  fontSmoothing: false,
  fontStyle: false,
  fontWeight: false,
  height: false,
  // inset: false,
  justifyContent: false,
  letterSpacing: false,
  lineHeight: false,
  listStylePosition: false,
  listStyleType: false,
  margin: false,
  maxHeight: false,
  maxWidth: false,
  minHeight: false,
  minWidth: false,
  objectFit: false,
  objectPosition: false,
  opacity: false,
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
  textColor: false,
  textOpacity: false,
  textDecoration: false,
  textTransform: false,
  userSelect: false,
  verticalAlign: false,
  visibility: false,
  whitespace: false,
  width: false,
  wordBreak: false,
  // zIndex: false,
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
  transitionProperty: false,
  transitionTimingFunction: false,
  transitionDuration: false,
  transitionDelay: false,
};

export = plugin.withOptions(
  () => {
    return (options: any) => {
      displayPlugin(options);
      overflowPlugin(options);
      positionPlugin(options);
    };
  },
  (options: any = {}) => {
    return (process.env.RN_TW_ENV || "mobile") === "mobile"
      ? reactNativeConfig(options)
      : reactNativeWebConfig(options);
  }
);
