import { Platform } from "react-native";
import { useMemo } from "react";
import merge from "deepmerge";
import {
  ComputedTailwindReactNativeStyles,
  PlatformVariantStyle,
  platformVariants,
  PlatformVariant,
} from "../types";

export const usePlatformStyle = (__: ComputedTailwindReactNativeStyles): PlatformVariantStyle => {
  return useMemo(() => {
    const native = __.native ?? {};

    const os: PlatformVariant = Platform.OS as any;

    if (!platformVariants.includes(os)) return native;

    return merge(native, __[os] ?? {});
  }, [__]);
};
