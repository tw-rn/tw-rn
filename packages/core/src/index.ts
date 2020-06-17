import * as RN from "react-native";
import withTailwindNative from "./hoc";

export { tw } from "./tw";
export { default as withTailwindNative } from "./hoc";

export const View = withTailwindNative(RN.View);
// export const View = withTailwindNative<Omit<RN.ViewProps, "style">>(RN.View);
export const Text = withTailwindNative(RN.Text);
export const TextInput = withTailwindNative(RN.TextInput);
