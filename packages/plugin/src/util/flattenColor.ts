import memoize from "fast-memoize";

export default memoize((colors: any) => {
  const flattened = Object.entries(colors).reduce((acc, [colorKey, color]) => {
    if (color && typeof color === "object") {
      const colorVariants = Object.entries(color).reduce((acc, [variantKey, variant]) => {
        return { ...acc, [`${colorKey}-${variantKey}`]: variant };
      }, {});
      return { ...acc, ...colorVariants };
    }

    return { ...acc, [colorKey]: color };
  }, {});

  return flattened;
});
