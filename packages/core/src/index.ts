import * as RN from "react-native";
import { withTwrn } from "./hocs";

export { tw } from "./tw";
export { withTwrn };

// Basic Components
export const View = withTwrn(RN.View, ["style"]);
export const Text = withTwrn(RN.Text, ["style"]);
export const Image = withTwrn(RN.Image, ["style"]);
export const TextInput = withTwrn(RN.TextInput, ["style"]);
export const ScrollView = withTwrn(RN.ScrollView, ["style", "contentContainerStyle"]);

// User interface
export const Switch = withTwrn(RN.Switch, ["style"]);

// List Views
export const FlatList = withTwrn(RN.FlatList, [
  "style",
  "contentContainerStyle",
  "ListFooterComponentStyle",
  "ListHeaderComponentStyle",
  "columnWrapperStyle",
]);

export const SectionList = withTwrn(RN.SectionList, ["style", "contentContainerStyle"]);

// Android Components and APIs
export const DrawerLayoutAndroid = withTwrn(RN.DrawerLayoutAndroid, ["style"]);

// Others
export const ActivityIndicator = withTwrn(RN.ActivityIndicator, ["style"]);
export const KeyboardAvoidingView = withTwrn(RN.KeyboardAvoidingView, ["style"]);

// Rest
export const ImageBackground = withTwrn(RN.ImageBackground, ["style", "imageStyle"]);

// TouchableOpacity
