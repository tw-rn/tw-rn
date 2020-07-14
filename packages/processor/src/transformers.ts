import transformCss from "css-to-react-native";
import { parse } from "./parsers";
import { ANDROID_PENUMBRA_MAP } from "./constants";

const boxShadowTransformer = (decl: [string, string]) => {
  const [prop, value] = decl;
  const { parsed, meta } = parse(prop, value);
  const transformed = transformCss([[prop, parsed]]);

  // Estimate the Android elevation
  // This can be improved
  const { offsetX, offsetY, blurRadius, spreadRadius } = meta;

  const sum = (acc: number, prop: string | number) =>
    acc + parseInt(`0${prop}`);

  const rank = [offsetX, offsetY, blurRadius, spreadRadius].reduce(sum, 0);

  const penumbraPosition = ANDROID_PENUMBRA_MAP.findIndex((penumbra) => {
    return penumbra.reduce(sum, 0) >= rank;
  });

  const elevation =
    penumbraPosition === -1
      ? ANDROID_PENUMBRA_MAP.length - 1
      : penumbraPosition > 0
      ? penumbraPosition - 1
      : 0;

  return { ...transformed, elevation };
};

export const transitionDurationTransformer = (decl: [string, string]) => {
  const [prop, value] = decl;

  const result = /^(\d+\.?\d{0,})(s|ms)$/.exec(value);

  if (!result) {
    throw new Error(`Invalid value for ${prop}: ${value}`);
  }

  const [, number, unit] = result;

  const newValue = unit === "ms" ? parseInt(number) : parseFloat(number) * 1000;

  return { transitionDuration: newValue };
};

export const transitionDelayTransformer = (decl: [string, string]) => {
  const [prop, value] = decl;

  const result = /^(\d+\.?\d{0,})(s|ms)$/.exec(value);

  if (!result) {
    throw new Error(`Invalid value for ${prop}: ${value}`);
  }

  const [, number, unit] = result;

  const newValue = unit === "ms" ? parseInt(number) : parseFloat(number) * 1000;

  return { transitionDelay: newValue };
};

export const transitionTimingFunctionTransformer = (decl: [string, string]) => {
  const [prop, value] = decl;

  // Keywords
  const keywords = [
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "linear",
    "step-start",
    "step-end",
  ];

  if (keywords.includes(value)) {
    return { transitionTimingFunction: { type: value, args: [] } };
  }

  // Functions
  if (value.startsWith("cubic-bezier")) {
    const result = /^cubic-bezier\((\d+\.?\d{0,})\s*,\s*(\d+\.?\d{0,})\s*,\s*(\d+\.?\d{0,})\s*,\s*(\d+\.?\d{0,})\)$/.exec(
      value
    );

    if (!result) throw new Error(`Invalid value for ${prop}: ${value}`);

    const [, x1, y1, x2, y2] = result;

    return {
      transitionTimingFunction: {
        type: "bezier",
        args: [parseFloat(x1), parseFloat(y1), parseFloat(x2), parseFloat(y2)],
      },
    };
  }

  throw new Error(`Transition timing function not supported ${prop}: ${value}`);
};

export const transitionPropertyTransformer = (decl: [string, string]) => {
  const [prop, value] = decl;

  if (value.match(/none/)) {
    return { transitionProperty: [] };
  }

  return { transitionProperty: value.split(/\s{0,},\s{0,}/) };
};

const transformersMap = {
  "box-shadow": boxShadowTransformer,
  "transition-duration": transitionDurationTransformer,
  "transition-delay": transitionDelayTransformer,
  "transition-timing-function": transitionTimingFunctionTransformer,
  "transition-property": transitionPropertyTransformer,
};

export const transform = (decls: [string, string][]): ParsedDeclarations => {
  const [defaultDecls, specificDecls] = decls.reduce<
    [[string, string][], [string, string][]]
  >(
    ([defaultDecls, specificDecls], decl) => {
      const prop = decl[0];
      if ((transformersMap as any)[prop] !== undefined) {
        return [defaultDecls, [...specificDecls, decl]];
      }

      return [[...defaultDecls, decl], specificDecls];
    },
    [[], []]
  );

  const defaultTransformed = transformCss(defaultDecls);

  const specificTransformed = specificDecls
    .map((decl) => {
      const transform = (transformersMap as any)[decl[0]];
      return transform(decl);
    })
    .reduce((acc, transformed) => {
      return { ...acc, ...transformed };
    }, {});

  return { ...defaultTransformed, ...specificTransformed };
};
