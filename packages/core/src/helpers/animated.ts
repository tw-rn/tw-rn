import tinycolor from "tinycolor2";

const one = () => 1;

const zero = () => 0;

const color = (nextValue: string) => {
  const color = tinycolor(nextValue);

  if (!color.isValid()) {
    throw new Error(`Invalid color ${nextValue}`);
  }

  return color.setAlpha(0);
};

export const getDefaultStyleValueFunction = (styleName: string) => {
  switch (styleName) {
    case "borderTopRightRadius":
    case "borderBottomLeftRadius":
    case "borderBottomRightRadius":
    case "borderRadius":
    case "borderTopLeftRadius":
    case "borderWidth":
      return zero;

    case "borderColor":
    case "backgroundColor":
    case "tintColor":
    case "color":
      return color;

    case "opacity":
      return one;

    default:
      return undefined;
  }
};
