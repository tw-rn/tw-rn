import { useMemo, useCallback, useState } from "react";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

export const useHoverStyle = (
  style: PlatformVariantStyle,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void
): {
  hoverStyle: ReactNativeStyle;
  handleOnMouseEnter: (e: any) => void;
  handleOnMouseLeave: (e: any) => void;
} => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = useMemo(() => {
    return isHovered ? style.hover || {} : {};
  }, [style, isHovered]);

  const handleOnMouseEnter = useCallback(
    (e) => {
      onMouseEnter?.(e);

      setIsHovered(true);
    },
    [style, onMouseEnter]
  );

  const handleOnMouseLeave = useCallback(
    (e) => {
      onMouseLeave?.(e);

      setIsHovered(false);
    },
    [style, onMouseLeave]
  );

  return { hoverStyle, handleOnMouseEnter, handleOnMouseLeave };
};
