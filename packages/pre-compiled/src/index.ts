import { Platform } from "react-native";
const reactStyles = require("./react-styles.js");
const reactNativeStyles = require("./react-native-styles.js");

(global as any).__TW_RN_STYLES__ = Platform.OS === "web" ? reactStyles : reactNativeStyles;
