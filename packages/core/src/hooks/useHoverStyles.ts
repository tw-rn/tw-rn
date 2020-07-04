import { useMemo, useCallback, useState } from "react";
import { PlatformVariantStyle, ReactNativeStyle } from "../types";

export const useHoverStyles = (
  styles: (PlatformVariantStyle | undefined)[],
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void
): {
  hoverStyles: (ReactNativeStyle | undefined)[];
  handleOnMouseEnter: (e: any) => void;
  handleOnMouseLeave: (e: any) => void;
} => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyles = useMemo(() => {
    return styles.map((style) => {
      if (style === undefined) return;

      return isHovered ? style.hover || {} : {};
    });
  }, [styles, isHovered]);

  const handleOnMouseEnter = useCallback(
    (e) => {
      onMouseEnter?.(e);

      setIsHovered(true);
    },
    [styles, onMouseEnter]
  );

  const handleOnMouseLeave = useCallback(
    (e) => {
      onMouseLeave?.(e);

      setIsHovered(false);
    },
    [styles, onMouseLeave]
  );

  return { hoverStyles, handleOnMouseEnter, handleOnMouseLeave };
};
