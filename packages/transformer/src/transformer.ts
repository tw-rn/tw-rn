import process from "@tw-rn/processor";
const upstreamTransformer = require("metro-react-native-babel-transformer");

const postCSSExtensions = ["css"];

const transformCss = async (content: string, filename: string, options: any) => {
  const styles = await process(content, "mobile");
  const newSrc = `global.__TAILWINDCSS_NATIVE_STYLES__ = ${JSON.stringify(styles)}`;

  const transformed = upstreamTransformer.transform({ src: newSrc, filename, options });

  return transformed;
};

export const transform = async function ({
  src,
  filename,
  options,
}: {
  src: string;
  filename: string;
  options: any;
}) {
  if (postCSSExtensions.some((ext) => filename.endsWith("." + ext))) {
    return await transformCss(src, filename, options);
  }
  return upstreamTransformer.transform({ src, filename, options });
};
