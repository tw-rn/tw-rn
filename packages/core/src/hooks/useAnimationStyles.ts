import { Animated, Easing } from "react-native";
import { useMemo, useCallback, useRef, useEffect } from "react";
import { Style, StyleValue } from "../types";
import { ANIMATION_CONFIG_STYLE_PROPS } from "../constants";
import { dashToCamelCase } from "../helpers/string";
import { getDefaultStyleValueFunction } from "../helpers/animated";

type AnimatedValues = {
  animatedValue: Animated.Value;
  interpolations: Animated.AnimatedInterpolation[];
  interpolatedValues: (number | string)[];
  listenerId?: string;
};

type AnimateValueConfig = {
  toValue: StyleValue;
  duration: StyleValue;
  timingFunction: StyleValue;
  delay: StyleValue;
};

export const useAnimationStyles = (
  combinedStyles: (Style | null | undefined)[]
): {
  requiresAnimatedComponent: boolean;
  regularOrAnimatedStyles: typeof combinedStyles;
} => {
  const animatedValuesRef = useRef<{
    [styleIndex: number]: { [key: string]: AnimatedValues };
  }>({});

  const createAnimatedValueIfDoesntExist = useCallback(
    (mapIndex: number, styleName: string) => {
      // Don't create if already exists
      if (animatedValuesRef.current[mapIndex]?.[styleName]) {
        return;
      }

      animatedValuesRef.current[mapIndex] =
        animatedValuesRef.current[mapIndex] ?? {};

      const animatedValue = new Animated.Value(0);

      animatedValuesRef.current[mapIndex][styleName] = {
        animatedValue,
        interpolations: [],
        interpolatedValues: [],
      };

      // Adding the listener for tracking
      const listenerId = animatedValue.addListener(() => {
        const { interpolations } = animatedValuesRef.current[mapIndex][
          styleName
        ];
        const newInterpolatedValues = interpolations.map((i) =>
          (i as any).__getValue()
        );

        animatedValuesRef.current[mapIndex][styleName][
          "interpolatedValues"
        ] = newInterpolatedValues;
      });

      animatedValuesRef.current[mapIndex][styleName]["listenerId"] = listenerId;
    },
    [animatedValuesRef]
  );

  const animateStyle = useCallback(
    (
      mapIndex: number,
      styleName: string,

      config: AnimateValueConfig
    ): Animated.AnimatedInterpolation => {
      createAnimatedValueIfDoesntExist(mapIndex, styleName);

      const values = animatedValuesRef.current[mapIndex]?.[styleName];
      const { animatedValue, interpolations, interpolatedValues } = values;
      const { toValue, duration = 0, timingFunction = {}, delay = 0 } = config;

      const { type = "linear", args = [] } = timingFunction as any;

      const easing =
        type === "bezier"
          ? Easing.bezier(args[0], args[1], args[2], args[3])
          : Easing.linear;

      // Check if this value has any interpolation
      if (interpolations.length) {
        animatedValue.stopAnimation();

        console.log({ from: interpolatedValues[0], to: toValue });

        const interpolation = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [interpolatedValues[0], toValue as any],
        });

        animatedValue.setValue(0);

        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration as number,
          easing,
          delay: delay as number,
          useNativeDriver: true,
        }).start();

        animatedValuesRef.current[mapIndex][styleName]["interpolations"] = [
          interpolation,
          // interpolatedValues: []
        ];

        return interpolation;
        // Check if is a shadow... (2 interpolations)
      }

      // We don't animate beause is the first mount, applying default values
      const defaultValue = getDefaultStyleValueFunction(styleName)(toValue);

      // Check if is object

      // Create a new interpolation
      const interpolation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [toValue as any, defaultValue as any],
      });

      animatedValuesRef.current[mapIndex][styleName]["interpolations"] = [
        interpolation,
      ];

      animatedValuesRef.current[mapIndex][styleName]["interpolatedValues"] = [
        toValue as any,
      ];

      return interpolation;
    },
    []
  );

  const transformStyles = useCallback(
    (mapIndex: number, style: Style): Style => {
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
              const config = {
                toValue: restStyles[styleName],
                duration: transitionDuration,
                timingFunction: transitionTimingFunction,
                delay: transitionDelay,
              };

              const value = animateStyle(mapIndex, styleName, config);

              return { ...acc, [styleName]: value };
            },
            {}
          );
          return { ...acc, ...stylesAnimatedValues };
        },
        {}
      );
      return { ...restStyles, ...animatedStyles };
    },
    []
  );

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
  }, [animatedValuesRef, combinedStyles, requiresAnimatedComponent]);

  return { requiresAnimatedComponent, regularOrAnimatedStyles };
};
