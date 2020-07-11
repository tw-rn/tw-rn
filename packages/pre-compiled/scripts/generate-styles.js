#!/usr/bin/env node
const yargs = require("yargs");
const process = require("@tw-rn/processor").default;
const util = require("util");
const readFile = util.promisify(require("fs").readFile);
const writeFile = util.promisify(require("fs").writeFile);
const { resolve } = require("path");

yargs.command(
  "build [platform]",
  "builds the web project",
  () => {},
  async (argv) => {
    const { platform } = argv;

    try {
      console.log(`📦 Building styles for ${platform}...`);

      const filename = platform === "mobile" ? "react-native-styles.js" : "react-styles.js";

      const css = await readFile(resolve(__dirname, "../src/style.css"), "utf8");

      const generated = await process(css, platform);

      await writeFile(
        resolve(__dirname, `../dist/${filename}`),
        `module.exports = ${JSON.stringify(generated)}`
      );

      console.log("Done.");
    } catch (error) {
      console.error({ error });
    }
  }
).argv;
