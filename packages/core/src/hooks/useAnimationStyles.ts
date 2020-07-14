import { Animated } from "react-native";
import { useMemo, useCallback, useRef, useEffect } from "react";
import merge from "deepmerge";
import isPlainObject from "is-plain-object";
import { PlatformVariantStyle, Style } from "../types";

export const useAnimationStyles = (
  styles: (PlatformVariantStyle | undefined)[],
  combinedStyles: (Style | null | undefined)[]
): {
  needsAnimatedComponent: boolean;
  regularOrAnimatedStyles: typeof combinedStyles;
  animatedValuesMaps: { [styleIndex: number]: { [key: string]: Animated.Value } };
} => {
  const animatedValuesMaps = useRef<{ [styleIndex: number]: { [key: string]: Animated.Value } }>(
    {}
  );

  const animationConfigs = useMemo(() => {
    return styles.map((style) => {
      if (style === undefined) return;
      return style.animation;
    });
  }, [styles]);

  const getValuesFromStyle = useCallback(
    (mapIndex: number, props: string[], defaults: any[]) => {
      const combinedStyle = combinedStyles[mapIndex];

      return props.map((prop, index) => {
        return combinedStyle?.[prop] ?? defaults[index];
      });
    },
    [combinedStyles, animatedValuesMaps]
  );

  const setAnimatedValues = useCallback(
    (mapIndex: number, propsToSet: string[], values: any[]) => {
      propsToSet.forEach((prop, index) => {
        const animatedValueIsSet = Boolean(animatedValuesMaps.current[mapIndex]?.[prop]);

        if (animatedValueIsSet) {
          // Animate here
          Animated.timing(animatedValuesMaps.current[mapIndex]![prop], {
            toValue: values[index],
            duration: 500,
            useNativeDriver: true,
          }).start();

          return;
        }

        // Add animated value
        // Check if the map is set
        if (animatedValuesMaps.current[mapIndex]) {
          animatedValuesMaps.current[mapIndex][prop] = new Animated.Value(values[index]);
        } else {
          animatedValuesMaps.current[mapIndex] = { [prop]: new Animated.Value(values[index]) };
        }
      });
      return animatedValuesMaps.current[mapIndex]!;
    },
    [animationConfigs, animatedValuesMaps]
  );

  const needsAnimatedComponent = animationConfigs.some((config) => !!config);

  const regularOrAnimatedStyles = useMemo(() => {
    if (!needsAnimatedComponent) return combinedStyles;

    return combinedStyles.map((combinedStyle, index) => {
      if (!combinedStyle) return combinedStyle;

      const config = animationConfigs[index];

      if (!config) return combinedStyle;

      // Get the transition type
      const { transitionType } = config;

      switch (transitionType) {
        // transition-opacity:
        // This will only handle the opacity style of the styles
        case "transition-opacity": {
          // Get the current config opacity or the dafault value
          const [opacity] = getValuesFromStyle(index, ["opacity"], [1]);
          const animatedValueStyles = setAnimatedValues(index, ["opacity"], [opacity]);

          return merge(combinedStyle, animatedValueStyles, {
            isMergeableObject: isPlainObject,
          });
        }

        default:
          // Here probably we clean up the animated values that are instantiated
          return combinedStyle;
      }
    });
  }, [animatedValuesMaps, animationConfigs, combinedStyles, needsAnimatedComponent]);

  return {
    needsAnimatedComponent,
    regularOrAnimatedStyles,
    animatedValuesMaps: animatedValuesMaps.current,
  };
};
