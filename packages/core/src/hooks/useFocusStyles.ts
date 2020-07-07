import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { useMemo, useCallback, useState } from "react";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

export const useFocusStyles = (
  styles: (PlatformVariantStyle | undefined)[],
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void,
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
): {
  focusStyles: (ReactNativeStyle | undefined)[];
  handleOnFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  handleOnBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} => {
  const [isFocused, setIsFocused] = useState(false);

  const focusStyles = useMemo(() => {
    return styles.map((style) => {
      if (style === undefined) return;

      return isFocused ? style.focus || {} : {};
    });
  }, [styles, isFocused]);

  const hasfocusStyles = useMemo(() => {
    return (
      focusStyles.length > 0 && focusStyles.some((style) => style && Object.keys(style).length > 0)
    );
  }, [focusStyles]);

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus?.(e);
      if (hasfocusStyles) setIsFocused(true);
    },
    [hasfocusStyles, focusStyles, onFocus]
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur?.(e);
      if (hasfocusStyles) setIsFocused(false);
    },
    [hasfocusStyles, focusStyles, onBlur]
  );

  return { focusStyles, handleOnFocus, handleOnBlur };
};
