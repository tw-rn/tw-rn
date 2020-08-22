import tinycolor from "tinycolor2";
import { StyleValue } from "../types";

const defaultNumber = (defaultValue: StyleValue) => () => defaultValue;

const same = (nextValue: StyleValue) => nextValue;

const color = (nextValue: StyleValue) => {
  const color = tinycolor(nextValue as string);

  if (!color.isValid()) {
    throw new Error(`Invalid color ${nextValue}`);
  }

  return color.setAlpha(0).toRgbString();
};

const shadow = (nextValue: StyleValue) => ({
  width: 0,
  height: 0,
});

export const getDefaultStyleValueFunction = (styleName: string) => {
  switch (styleName) {
    case "borderTopRightRadius":
    case "borderBottomLeftRadius":
    case "borderBottomRightRadius":
    case "borderRadius":
    case "borderTopLeftRadius":
    case "borderWidth":
    case "borderBottomWidth":
    case "borderEndWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderStartWidth":
    case "borderTopWidth":
    case "borderWidth":
    case "margin":
    case "marginBottom":
    case "marginEnd":
    case "marginHorizontal":
    case "marginLeft":
    case "marginRight":
    case "marginStart":
    case "marginTop":
    case "marginVertical":
    case "padding":
    case "paddingBottom":
    case "paddingEnd":
    case "paddingHorizontal":
    case "paddingLeft":
    case "paddingRight":
    case "paddingStart":
    case "paddingTop":
    case "paddingVertical":
    case "top":
    case "left":
    case "zIndex":
    case "shadowOpacity":
    case "shadowRadius":
    case "textShadowRadius":
    case "borderBottomEndRadius":
    case "borderBottomLeftRadius":
    case "borderBottomRightRadius":
    case "borderBottomStartRadius":
    case "borderBottomWidth":
    case "borderLeftWidth":
    case "borderRadius":
    case "borderRightWidth":
    case "borderTopEndRadius":
    case "borderTopLeftRadius":
    case "borderTopRightRadius":
    case "borderTopStartRadius":
    case "borderTopWidth":
    case "elevation":
      return defaultNumber(0);

    case "opacity":
      return defaultNumber(1);

    case "borderColor":
    case "backgroundColor":
    case "tintColor":
    case "color":
    case "textShadowColor":
    case "textDecorationColor":
    case "borderRightColor":
    case "borderBottomColor":
    case "borderColor":
    case "borderEndColor":
    case "borderLeftColor":
    case "backgroundColor":
    case "borderStartColor":
    case "borderTopColor":
      return color;

    case "aspectRatio":
    case "bottom":
    case "end":
    case "flex":
    case "flexBasis":
    case "flexGrow":
    case "flexShrink":
    case "height":
    case "maxHeight":
    case "maxWidth":
    case "minHeight":
    case "minWidth":
    case "right":
    case "start":
    case "width":
    case "shadowColor":
    case "lineHeight":
    case "letterSpacing":
      return same;

    case "shadowOffset":
    case "textShadowOffset":
      return shadow;

    case "fontSize":
      return defaultNumber(14);

    default:
      return same;
  }
};
