import { useMemo, useCallback, useState, useEffect } from "react";
import { Platform } from "react-native";
import merge from "deepmerge";
import isPlainObject from "is-plain-object";
import { PlatformVariantStyle, Style } from "../types";

export const useMediaStyles = (
  styles: (PlatformVariantStyle | undefined)[]
): (Style | null | undefined)[] => {
  // Get the media query list matches from window
  const isWeb = Platform.OS === "web";
  const isNotBrowser = typeof window === "undefined" || typeof window.matchMedia === "undefined";

  const mediaQueryList = useMemo((): { [key: string]: MediaQueryList } => {
    if (!isWeb || isNotBrowser) return {};

    const mediaQueryList = styles.reduce<{ [key: string]: MediaQueryList }>((acc, style) => {
      if (style === undefined) return acc;

      const { media = {} } = style;
      const queries = Object.keys(media);

      const matchMedia = queries.reduce((acc, media) => {
        return { ...acc, [media]: window.matchMedia(media) };
      }, {});

      return { ...acc, ...matchMedia };
    }, {});

    return mediaQueryList;
  }, [styles]);

  // Get the media query that current matches
  const getCurrentMediaQueryValue = useCallback(() => {
    const queries = Object.keys(mediaQueryList);

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
    if (isWeb && !isNotBrowser) {
      const handler = () => setCurrentMediaQueryValue(getCurrentMediaQueryValue);

      const queries = Object.keys(mediaQueryList);

      queries.forEach((query) => mediaQueryList[query].addListener(handler));

      return () => {
        queries.forEach((query) => mediaQueryList[query].removeListener(handler));
      };
    }
  }, [styles, currentMediaQueryValue, mediaQueryList]);

  const mediaStyles = useMemo(() => {
    return styles.map((style) => {
      if (style === undefined) return;

      const { media = {} } = style;

      // if is SSR, return undefined
      if (isWeb && isNotBrowser) return null;

      const defaultStyles = media?.[""] || {};

      // If is web, combine the non related media query values ('')
      // with the current media query
      if (isWeb) {
        const mediaQueryStyles = media?.[currentMediaQueryValue] || {};
        return merge(defaultStyles, mediaQueryStyles, { isMergeableObject: isPlainObject });
      }

      // Else, return the non related media query values
      return defaultStyles;
    });
  }, [styles, currentMediaQueryValue, mediaQueryList]);

  return mediaStyles;
};
