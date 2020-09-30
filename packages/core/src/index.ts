import * as RN from "react-native";
import { withTwrn } from "./hocs";

export * from "./types";
export { tw } from "./tw";
export { withTwrn };

// Basic Components
export const View = withTwrn(RN.View, ["style"]);
export const Text = withTwrn(RN.Text, ["style"]);
export const Image = withTwrn(RN.Image, ["style"]);
export const TextInput = withTwrn(RN.TextInput, ["style"]);
export const ScrollView = withTwrn(RN.ScrollView, [
  "style",
  "contentContainerStyle",
]);

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

export const SectionList = withTwrn(RN.SectionList, [
  "style",
  "contentContainerStyle",
]);

// Android Components and APIs
export const DrawerLayoutAndroid = withTwrn(RN.DrawerLayoutAndroid, ["style"]);

// Others
export const ActivityIndicator = withTwrn(RN.ActivityIndicator, ["style"]);
export const KeyboardAvoidingView = withTwrn(RN.KeyboardAvoidingView, [
  "style",
]);

// Rest
export const ImageBackground = withTwrn(RN.ImageBackground, [
  "style",
  "imageStyle",
]);
export const SafeAreaView = withTwrn(RN.SafeAreaView, ["style"]);
export const TouchableHighlight = withTwrn(RN.TouchableHighlight, ["style"]);
export const TouchableOpacity = withTwrn(RN.TouchableOpacity, ["style"]);
export const TouchableWithoutFeedback = withTwrn(RN.TouchableWithoutFeedback, [
  "style",
]);
// For some reason "ListFooterComponentStyle" and "ListHeaderComponentStyle" are not in FlatList type
// definitions but they are in the docs https://reactnative.dev/docs/virtualizedlist
type VirtualizedListPropsWithMissingStyles<ItemT> = {
  ListFooterComponentStyle?: any;
  ListHeaderComponentStyle?: any;
} & RN.VirtualizedListProps<ItemT>;

export const VirtualizedList = withTwrn<
  VirtualizedListPropsWithMissingStyles<unknown>,
  | "style"
  | "contentContainerStyle"
  | "ListFooterComponentStyle"
  | "ListHeaderComponentStyle"
>(RN.VirtualizedList, [
  "style",
  "contentContainerStyle",
  "ListFooterComponentStyle",
  "ListHeaderComponentStyle",
]);

export const Animated = {
  ...RN.Animated,
  Image: withTwrn(RN.Animated.Image, ["style"]),
  ScrollView: withTwrn(RN.Animated.ScrollView, [
    "style",
    "contentContainerStyle",
  ]),
  Text: withTwrn(RN.Animated.Text, ["style"]),
  View: withTwrn(RN.Animated.View, ["style"]),
  FlatList: withTwrn(RN.Animated.FlatList, [
    "style",
    "contentContainerStyle",
    "ListFooterComponentStyle",
    "ListHeaderComponentStyle",
    "columnWrapperStyle",
  ]),
  SectionList: withTwrn(RN.Animated.SectionList, [
    "style",
    "contentContainerStyle",
  ]),
};
