import * as RN from "react-native";
import withTwrn from "./withTwrn";

export { tw } from "./tw";
export { default as withTwrn } from "./withTwrn";

// Basic Components
export const View = withTwrn(RN.View);
export const Text = withTwrn(RN.Text);
export const Image = withTwrn(RN.Image);
export const TextInput = withTwrn(RN.TextInput);
export const ScrollView = withTwrn(RN.ScrollView);
