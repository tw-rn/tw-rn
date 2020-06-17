// @generated: @expo/next-adapter@2.1.9
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require("@expo/next-adapter");
const withTM = require("next-transpile-modules")(["tw-rn"]);
const withTailwindNative = require("@tw-rn/next-adapter");

module.exports = withTailwindNative(
  withTM(
    withExpo({
      projectRoot: __dirname,
    })
  )
);
