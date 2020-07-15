import { useMemo, useCallback, useState } from "react";
import { PlatformVariantStyle, Style } from "../types";

export const useHoverStyles = (
  styles: (PlatformVariantStyle | undefined)[],
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void
): {
  hoverStyles: (Style | undefined)[];
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

  const hasHoverStyles = useMemo(() => {
    return (
      styles.length > 0 &&
      styles.some((style) => style && style.hover && Object.keys(style.hover).length > 0)
    );
  }, [styles]);

  const handleOnMouseEnter = useCallback(
    (e) => {
      onMouseEnter?.(e);
      if (hasHoverStyles) setIsHovered(true);
    },
    [hasHoverStyles, hoverStyles, onMouseEnter]
  );

  const handleOnMouseLeave = useCallback(
    (e) => {
      onMouseLeave?.(e);
      if (hasHoverStyles) setIsHovered(false);
    },
    [hasHoverStyles, hoverStyles, onMouseLeave]
  );

  return { hoverStyles, handleOnMouseEnter, handleOnMouseLeave };
};
