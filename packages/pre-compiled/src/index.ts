import { Platform } from "react-native";
const webStyles = require("./web-styles.js");
const nativeStyles = require("./native-styles.js");

(global as any).__TW_RN_STYLES__ = Platform.OS === "web" ? webStyles : nativeStyles;
