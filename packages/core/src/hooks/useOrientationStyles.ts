import { useMemo, useCallback, useState, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import { PlatformVariantStyle, Style } from "../types";

export const useOrientationStyles = (
  styles: (PlatformVariantStyle | undefined)[]
): (Style | undefined)[] => {
  const isMobile = useMemo(() => ["ios", "android"].includes(Platform.OS), []);

  const hasOrientationStyles = useMemo(() => {
    return styles.some((style) => !!(style?.landscape || style?.portrait));
  }, [styles]);

  const getOrientation = useCallback((): "landscape" | "portrait" | undefined => {
    if (!isMobile) return;

    const { height, width } = Dimensions.get("screen");

    return height > width ? "portrait" : "landscape";
  }, [styles]);

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
  }, [styles, getOrientation, setOrientation, hasOrientationStyles, isMobile]);

  const orientationStyles = useMemo(() => {
    return styles.map((style) => {
      if (style === undefined) return;

      if (!hasOrientationStyles || !orientation) return {};

      const { landscape = {}, portrait = {} } = style;

      return orientation === "landscape" ? landscape : portrait;
    });
  }, [styles, orientation, hasOrientationStyles]);

  return orientationStyles;
};
