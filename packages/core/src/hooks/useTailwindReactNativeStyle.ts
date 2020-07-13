import { useMemo, useCallback, useState, useEffect } from "react";
import { ComputedTailwindReactNativeStyles, TailwindReactNativeStyle } from "../types";
import { convertToTailwindReactNativeStyle } from "../helpers";
import { StyleProp } from "react-native";

export const useTailwindReactNativeStyle = <P, O>(
  props: P,
  styleKeys: O[]
): (ComputedTailwindReactNativeStyles | undefined)[] => {
  const getStyleFromProps = useCallback((props) => {
    return styleKeys.map((key) => (props as any)[key]);
  }, []);

  const [styles, setStyles] = useState(getStyleFromProps(props));

  useEffect(() => {
    const newStyles = getStyleFromProps(props);
    if (JSON.stringify(styles) !== JSON.stringify(newStyles)) {
      setStyles(newStyles);
    }
  }, [props]);

  return useMemo(() => {
    return (styles as typeof styles[]).map((style) => convertToTailwindReactNativeStyle(style)?.__);
  }, [styles]);
};
