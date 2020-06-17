// import { getDefaultConfig } from "metro-config";
import { transform } from "./transformer";

// export const metroConfig = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("./transformer.js"),
//     },
//     resolver: {
//       assetExts: assetExts.filter((ext: any) => ext !== "css"),
//       sourceExts: [...sourceExts, "css"],
//     },
//   };
// })();

export { transform };
