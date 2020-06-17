import process from "@tw-rn/processor";

export default async (content: string, map: any, meta: any) => {
  const styles = await process(content, "web");
  return `global.__TAILWINDCSS_NATIVE_STYLES__ = ${JSON.stringify(styles)}`;
};
