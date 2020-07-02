import { useMemo, useCallback, useState, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

export const useOrientationStyle = (style: PlatformVariantStyle): ReactNativeStyle => {
  const isMobile = useMemo(() => ["ios", "android"].includes(Platform.OS), []);
  const hasOrientationStyles = !!(style.landscape || style.portrait);

  const getOrientation = useCallback((): "landscape" | "portrait" | undefined => {
    if (!isMobile) return;

    const { height, width } = Dimensions.get("screen");

    return height > width ? "portrait" : "landscape";
  }, [style]);

  const [orientation, setOrientation] = useState<"landscape" | "portrait" | undefined>(
    getOrientation
  );

  useEffect(() => {
    if (isMobile && hasOrientationStyles) {
      const handleOnChange = () => setOrientation(getOrientation);

      Dimensions.addEventListener("change", handleOnChange);
      return () => {
        Dimensions.removeEventListener("change", handleOnChange);
      };
    }
  }, [style, getOrientation, setOrientation, hasOrientationStyles, isMobile]);

  const orientationStyle = useMemo(() => {
    if (!hasOrientationStyles || !orientation) return {};

    const { landscape = {}, portrait = {} } = style;

    return orientation === "landscape" ? landscape : portrait;
  }, [style, orientation, hasOrientationStyles]);

  return orientationStyle;
};
