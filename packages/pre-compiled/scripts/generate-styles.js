#!/usr/bin/env node
const yargs = require("yargs");
const process = require("@tw-rn/processor").default;
const util = require("util");
const readFile = util.promisify(require("fs").readFile);
const writeFile = util.promisify(require("fs").writeFile);
const { resolve } = require("path");

yargs.command(
  "build",
  "builds the web project",
  () => {},
  async (argv) => {
    try {
      console.log("📦 Building styles...");

      const css = await readFile(resolve(__dirname, "../src/style.css"), "utf8");

      const generatedWeb = await process(css, "web");
      const generatedNative = await process(css, "mobile");

      await writeFile(
        resolve(__dirname, "../dist/web-styles.js"),
        `module.exports = ${JSON.stringify(generatedWeb)}`
      );
      await writeFile(
        resolve(__dirname, "../dist/native-styles.js"),
        `module.exports = ${JSON.stringify(generatedNative)}`
      );

      console.log("Done.");
    } catch (error) {
      console.error({ error });
    }
  }
).argv;
