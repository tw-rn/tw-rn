const { createMetroConfiguration } = require("expo-yarn-workspaces");
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  const workspaceConfiguration = createMetroConfiguration(__dirname);

  return {
    ...workspaceConfiguration,
    transformer: {
      babelTransformerPath: require.resolve("@tw-rn/transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "css"),
      sourceExts: [...sourceExts, "css"],
    },
  };
})();
