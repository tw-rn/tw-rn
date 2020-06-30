import process from "@tw-rn/processor";

export default async (content: string, map: any, meta: any) => {
  const styles = await process(content, "web");
  return `global.__TW_RN_STYLES__ = ${JSON.stringify(styles)}`;
};
