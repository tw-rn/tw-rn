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

  const sum = (acc: number, prop: string | number) => acc + parseInt(`0${prop}`);

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

const transformersMap = {
  "box-shadow": boxShadowTransformer,
};

export const transform = (decls: [string, string][]): ParsedDeclarations => {
  const [defaultDecls, specificDecls] = decls.reduce<[[string, string][], [string, string][]]>(
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
