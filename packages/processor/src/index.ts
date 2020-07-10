import chalk from "chalk";
import postcss from "postcss";

const { log } = console;

const logName = chalk.green("[tw-rn]");

const getUserRules = async (content: string) => {
  const root = await postcss.parse(content, { from: undefined });

  let rules: string[] = [];

  root?.walkRules((rule) =>
    rule.selectors.forEach((selector) => {
      rules = [...rules, selector.replace(/[\.\\]/g, "")];
    })
  );

  return rules;
};

const execute = async (content: string, platform: "web" | "mobile") => {
  process.env.RN_TW_ENV = platform;

  console.time("Finishing processing");

  log(`${logName} building`);

  const userRules = await getUserRules(content);

  // Assign processed from the plugin to the variable
  let processed = {};
  const onProcessed = (p: any) => (processed = p);
  const plugin = require("./plugin")({ onProcessed, platform, userRules });

  const options = { from: undefined };
  await postcss([require("tailwindcss"), plugin]).process(content, options);

  console.timeEnd("Finishing processing");

  log(`${logName} built`);

  return processed;
};

export default execute;
