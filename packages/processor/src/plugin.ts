import postcss, { AtRule, Rule } from "postcss";
import { yellow, green, redBright } from "chalk";
import merge from "deepmerge";
import { transform } from "./transformers";
import { reactNativeValidStyles, reactValidStyles } from "./valid-styles";

const convertUnit = (value: string): string => {
  const regex = /\.?\-?[0-9]+(\.[0-9]+)?rem/;

  const result = regex.exec(value) || [];
  const [match] = result;

  if (match) {
    const newValue = parseFloat(match) * 16;
    return convertUnit(value.replace(regex, `${newValue}px`));
  } else {
    return value;
  }
};

const validateTransformedDecls = (
  decls: ParsedDeclarations,
  platform: Platform
) => {
  Object.entries(decls).forEach(([key, value]) => {
    if (platform === "mobile") {
      const validStyleKey = key as keyof typeof reactNativeValidStyles;
      const validStyle = reactNativeValidStyles[validStyleKey];

      if (!validStyle) throw new Error(`${key} is not a valid prop [${value}]`);

      if (!validStyle(value))
        throw new Error(`${value} is not a valid value for ${key}`);
    } else {
      const validStyleKey = key as keyof typeof reactValidStyles;
      const validStyle = reactValidStyles[validStyleKey];

      if (!validStyle) throw new Error(`${key} is not a valid prop [${value}]`);

      if (!validStyle(value))
        throw new Error(`${value} is not a valid value for ${key}`);
    }
  });
};

const getVars = (rule: Rule) => {
  const vars: Variables = {};

  rule.walkDecls(/^\-\-/, (decl) => {
    vars[decl.prop] = convertUnit(decl.value);
    decl.remove();
  });

  return vars;
};

const getTransformedDecls = (
  rule: Rule,
  vars: Variables,
  platform: Platform
) => {
  let decls: [string, string][] = [];

  rule.walkDecls((decl) => {
    // console.log(`------\n ${yellow(decl.prop)} => ${yellow(decl.value)}`);
    // Try to replace variables if found any
    const regex = /var\((--[a-zA-Z-_]+)\)/;

    const [, variableName] = regex.exec(decl.value) || [];

    if (variableName) {
      const value = decl.value.replace(regex, vars[variableName]);

      decls = [...decls, [decl.prop, value]];

      // console.log(` ${green(decl.prop)} => ${green(value)} \n------`);
    } else {
      const value = convertUnit(decl.value);

      // console.log(` ${green(decl.prop)} => ${green(value)} \n------`);

      decls = [...decls, [decl.prop, value]];
    }
  });

  try {
    const transformed = transform(decls);

    validateTransformedDecls(transformed, platform);

    return transformed;
  } catch (error) {
    console.log(`${redBright(error)}`);
    return {} as ParsedDeclarations;
  }
};

const getTransformedRule = (rule: Rule, platform: Platform) => {
  let styles: Styles = {};

  const transformedDecls = getTransformedDecls(rule, getVars(rule), platform);

  if (Object.keys(transformedDecls).length === 0) {
    rule.remove();
    return {};
  }

  rule.selectors.forEach((selector) => {
    const newSelector = /[\.\\]/g;
    styles[selector.replace(newSelector, "")] = transformedDecls;
  });

  return styles;
};

const getNativeStyleFromAtRules = (
  atRule: AtRule,
  userRules: string[],
  platform: Platform
) => {
  let styles: Styles = {};

  atRule.walkRules((rule) => {
    styles = { ...styles, ...getTransformedRule(rule, platform) };
  });

  atRule.remove();

  return styles;
};

const plugin = postcss.plugin(
  "react-native-transform",
  (opts: PluginOptions = {}) => {
    const {
      onProcessed = () => {},
      platform = "mobile",
      userRules = [],
    } = opts;

    let styles: MediaStyles = {};

    return (root, result) => {
      // Walk breakpoints
      root.walkAtRules("media", (atRule) => {
        styles = merge(styles, {
          [atRule.params]: getNativeStyleFromAtRules(
            atRule,
            userRules,
            platform
          ),
        });
      });

      root.walkRules((rule) => {
        styles = merge(styles, { "": getTransformedRule(rule, platform) });
        rule.remove();
      });

      onProcessed(styles);
    };
  }
);

export = plugin;
