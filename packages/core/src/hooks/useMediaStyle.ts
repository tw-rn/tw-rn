import { useMemo, useCallback, useState, useEffect } from "react";
import { Platform } from "react-native";
import merge from "deepmerge";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

const isWeb = Platform.OS === "web";
const isSSR = typeof window === "undefined" || typeof window.matchMedia === "undefined";

export const useMediaStyle = (style: PlatformVariantStyle): ReactNativeStyle | undefined => {
  // Get the media query list matches from window
  const mediaQueryList = useMemo((): { [key: string]: MediaQueryList } => {
    console.log({
      isWeb,
      isSSR,
      window,
      t1: typeof window === "undefined",
      t2: typeof window.matchMedia === "undefined",
    });
    if (!isWeb || isSSR) return {};

    const { media = {} } = style;
    const queries = Object.keys(media);

    return queries.reduce((acc, media) => {
      return { ...acc, [media]: window.matchMedia(media) };
    }, {});
  }, [style]);

  // Get the media query that current matches
  const getCurrentMediaQueryValue = useCallback(() => {
    const queries = Object.keys(mediaQueryList);

    console.log({ mediaQueryList });

    // If is not found, set '' as default
    return queries.reverse().find((key) => mediaQueryList[key].matches) || "";
  }, [mediaQueryList]);

  const [currentMediaQueryValue, setCurrentMediaQueryValue] = useState<string>(
    getCurrentMediaQueryValue
  );

  // Set the initial media query value
  // This works to re-render the component once it mounts from SSR
  useEffect(() => {
    setCurrentMediaQueryValue(getCurrentMediaQueryValue());
  }, []);

  // Add the event handlers for switching styles depending on the media query
  // If we don't have any media queries this won't add anything, so if we're not
  // in a Window (web w/o SRR) it won't crash
  useEffect(() => {
    if (isWeb && !isSSR) {
      const handler = () => setCurrentMediaQueryValue(getCurrentMediaQueryValue);

      const queries = Object.keys(mediaQueryList);

      queries.forEach((query) => mediaQueryList[query].addListener(handler));

      return () => {
        queries.forEach((query) => mediaQueryList[query].removeListener(handler));
      };
    }
  }, [style, currentMediaQueryValue, mediaQueryList]);

  const mediaStyle = useMemo(() => {
    const { media = {} } = style;

    // if is SSR, return undefined
    if (isSSR) return;

    // If is web, combine the non related media query values ('')
    // with the current media query

    const defaultStyles = media?.[""] || {};

    if (isWeb) {
      const mediaQueryStyles = media?.[currentMediaQueryValue] || {};
      return merge(defaultStyles, mediaQueryStyles);
    }

    // Else, return the non related media query values
    return defaultStyles;
  }, [style, currentMediaQueryValue, mediaQueryList]);

  return mediaStyle;
};
