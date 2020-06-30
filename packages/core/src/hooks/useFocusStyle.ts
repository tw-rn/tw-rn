import { NativeSyntheticEvent, TargetedEvent } from "react-native";
import { useMemo, useCallback, useState } from "react";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

export const useFocusStyle = (
  style: PlatformVariantStyle,
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void,
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
): {
  focusStyle: ReactNativeStyle;
  handleOnFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  handleOnBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void;
} => {
  const [isFocused, setIsFocused] = useState(false);

  const focusStyle = useMemo(() => {
    return isFocused ? style.focus || {} : {};
  }, [style, isFocused]);

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus?.(e);

      setIsFocused(true);
    },
    [style, onFocus]
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur?.(e);

      setIsFocused(false);
    },
    [style, onBlur]
  );

  return { focusStyle, handleOnFocus, handleOnBlur };
};
