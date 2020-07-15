import { Animated, Easing } from "react-native";
import { useMemo, useCallback, useRef } from "react";
import { Style, StyleValue } from "../types";
import { ANIMATION_CONFIG_STYLE_PROPS } from "../constants";
import { dashToCamelCase } from "../helpers/string";

export const useAnimationStyles = (
  combinedStyles: (Style | null | undefined)[]
): {
  requiresAnimatedComponent: boolean;
  regularOrAnimatedStyles: typeof combinedStyles;
} => {
  const animatedValuesMaps = useRef<{
    [styleIndex: number]: { [key: string]: Animated.Value };
  }>({});

  const getValueFromStyle = useCallback(
    (combinedStyle: Style, prop: string, defaultValue: any) => {
      return combinedStyle?.[prop] ?? defaultValue;
    },
    [animatedValuesMaps]
  );

  const animateValue = useCallback(
    (
      value: Animated.Value,
      toValue: StyleValue,
      transitionDuration: StyleValue = 0,
      transitionTimingFunction: StyleValue,
      transitionDelay: StyleValue = 0
    ) => {
      const { type = "linear", args = [] } =
        (transitionTimingFunction as any) || {};

      const easing =
        type === "bezier"
          ? Easing.bezier(args[0], args[1], args[2], args[3])
          : Easing.linear;

      if (typeof toValue === "number") {
        Animated.timing(value, {
          toValue,
          duration: transitionDuration as number,
          easing,
          delay: transitionDelay as number,
          useNativeDriver: true,
        }).start();
      }
    },
    []
  );

  const getAnimatedValue = useCallback(
    (mapIndex: number, styleName: string): Animated.Value => {
      if (
        animatedValuesMaps.current[mapIndex] &&
        animatedValuesMaps.current[mapIndex][styleName]
      ) {
        return animatedValuesMaps.current[mapIndex][styleName];
      }

      animatedValuesMaps.current[mapIndex] =
        animatedValuesMaps.current[mapIndex] ?? {};

      // TODO: check the animatedvalue for stylename
      animatedValuesMaps.current[mapIndex][styleName] = new Animated.Value(1);

      return animatedValuesMaps.current[mapIndex][styleName];
    },
    [animatedValuesMaps]
  );

  const transformStyles = useCallback((mapIndex, style: Style): Style => {
    const {
      transitionProperty,
      transitionDuration,
      transitionTimingFunction,
      transitionDelay,
      ...restStyles
    } = style;

    const restStylesKeys = Object.keys(restStyles);

    const animatedStyles = (transitionProperty as string[]).reduce(
      (acc, prop) => {
        // Get the styles to animate for this prop
        // NOTE: can be wrong so this needs to be tested exahustively
        const regex = new RegExp(`^${prop.split("-").join(".*")}.*$`, "i");
        const styleNamesToAnimate = restStylesKeys.filter((key) => {
          return regex.exec(key);
        });

        const stylesAnimatedValues = styleNamesToAnimate.reduce(
          (acc, styleName) => {
            const animatedValue = getAnimatedValue(mapIndex, styleName);

            animateValue(
              animatedValue,
              restStyles[styleName],
              transitionDuration,
              transitionTimingFunction,
              transitionDelay
            );

            return { ...acc, [styleName]: animatedValue };
          },
          {}
        );

        return { ...acc, ...stylesAnimatedValues };
      },
      {}
    );

    return { ...restStyles, ...animatedStyles };
  }, []);

  const requiresAnimatedComponent = useMemo(
    () =>
      combinedStyles.some((combinedStyle) => {
        if (combinedStyle) {
          return Object.keys(combinedStyle).some((key) =>
            ANIMATION_CONFIG_STYLE_PROPS.includes(key as any)
          );
        }

        return false;
      }),
    [combinedStyles]
  );

  const regularOrAnimatedStyles = useMemo(() => {
    if (!requiresAnimatedComponent) return combinedStyles;

    return combinedStyles.map((combinedStyle, index) => {
      return combinedStyle
        ? transformStyles(index, combinedStyle)
        : combinedStyle;
    });
  }, [animatedValuesMaps, combinedStyles, requiresAnimatedComponent]);

  return { requiresAnimatedComponent, regularOrAnimatedStyles };
};
