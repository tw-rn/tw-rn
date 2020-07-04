import * as RN from "react-native";
import { withTwrn, withTwrnScrollView, withTwrnFlatList } from "./hocs";

export { tw } from "./tw";
export { withTwrn, withTwrnScrollView, withTwrnFlatList };

// Basic Components
export const View = withTwrn(RN.View);
export const Text = withTwrn(RN.Text);
export const Image = withTwrn(RN.Image);
export const TextInput = withTwrn(RN.TextInput);
export const ScrollView = withTwrnScrollView(RN.ScrollView);

// User interface
export const Switch = withTwrn(RN.Switch);

// List Views
export const FlatList = withTwrnFlatList(RN.FlatList);

// Others
export const ActivityIndicator = withTwrn(RN.ActivityIndicator);
export const KeyboardAvoidingView = withTwrn(RN.KeyboardAvoidingView);
export const RefreshControl = withTwrn(RN.RefreshControl);

// TouchableOpacity
