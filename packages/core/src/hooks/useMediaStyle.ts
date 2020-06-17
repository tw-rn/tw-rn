import { useMemo, useCallback, useState, useEffect } from "react";
import { StyleSheet, Platform } from "react-native";
import { TailwindStyle } from "../types";

export const useMediaStyle = (style: TailwindStyle) => {
  const mediaQueryList = useMemo(() => {
    if (
      Platform.OS !== "web" ||
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return null;
    }

    const { media } = style;

    return Object.keys(media || {}).reduce<{ [key: string]: MediaQueryList }>((acc, media) => {
      return { ...acc, [media]: window.matchMedia(media) };
    }, {});
  }, [style]);

  const getCurrentMediaQueryValue = useCallback(() => {
    if (mediaQueryList === null) return "";

    return Object.keys(mediaQueryList)
      .reverse()
      .find((key) => mediaQueryList[key].matches);
  }, [style]);

  const [currentMediaQueryValue, setCurrentMediaQueryValue] = useState<string | null | undefined>(
    Platform.OS === "web" ? null : getCurrentMediaQueryValue
  );

  useEffect(() => {
    setCurrentMediaQueryValue(getCurrentMediaQueryValue());
  }, []);

  useEffect(() => {
    if (Platform.OS === "web" && mediaQueryList !== null) {
      const handler = () => setCurrentMediaQueryValue(getCurrentMediaQueryValue);

      const queries = Object.keys(mediaQueryList || {});

      queries.forEach((query) => mediaQueryList[query].addListener(handler));

      return () => {
        queries.forEach((query) => mediaQueryList[query].removeListener(handler));
      };
    }
  }, [style, currentMediaQueryValue, mediaQueryList]);

  const mediaStyle = useMemo(() => {
    const isWeb = Platform.OS === "web";

    // Media
    const { media } = style;

    if (!media || currentMediaQueryValue === null) return {};

    const mediaStyleSheet = StyleSheet.create(media);

    const mediaStyle = isWeb
      ? StyleSheet.compose(mediaStyleSheet[""], mediaStyleSheet[currentMediaQueryValue || ""])
      : mediaStyleSheet[""];

    return mediaStyle;
  }, [style, currentMediaQueryValue, mediaQueryList]);

  return { mediaStyle, currentMediaQueryValue };
};
