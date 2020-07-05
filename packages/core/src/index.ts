import * as RN from "react-native";
import {
  withTwrnBasicComponent,
  withTwrnScrollView,
  withTwrnFlatList,
  withTwrnSectionList,
  withTwrnImageBackground,
  withTwrn,
} from "./hocs";

export { tw } from "./tw";
export {
  withTwrnBasicComponent,
  withTwrnScrollView,
  withTwrnFlatList,
  withTwrnSectionList,
  withTwrnImageBackground,
};

// Basic Components
const View = withTwrn(RN.View, ["style"]);

// export const View = withTwrnBasicComponent(RN.View);
export const Text = withTwrnBasicComponent(RN.Text);
export const Image = withTwrnBasicComponent(RN.Image);
export const TextInput = withTwrnBasicComponent(RN.TextInput);
export const ScrollView = withTwrnScrollView(RN.ScrollView);

// User interface
export const Switch = withTwrnBasicComponent(RN.Switch);

// List Views
export const FlatList = withTwrnFlatList(RN.FlatList);
export const SectionList = withTwrnSectionList(RN.SectionList);

// Android Components and APIs
export const DrawerLayoutAndroid = withTwrnBasicComponent(RN.DrawerLayoutAndroid);

// Others
export const ActivityIndicator = withTwrnBasicComponent(RN.ActivityIndicator);
export const KeyboardAvoidingView = withTwrnBasicComponent(RN.KeyboardAvoidingView);
export const RefreshControl = withTwrnBasicComponent(RN.RefreshControl);

// Rest
export const ImageBackground = withTwrnImageBackground(RN.ImageBackground);

// TouchableOpacity
