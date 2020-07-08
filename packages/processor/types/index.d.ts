declare module "css-to-react-native";

type Platform = "web" | "mobile";

type PluginOptions = {
  onProcessed?: (processed: { [key: string]: any }) => void;
  userRules?: string[];
  platform?: Platform;
};

type Variables = { [key: string]: string };

type ParsedDeclarations = { [key: string]: string };

type Styles = { [key: string]: ParsedDeclarations };

type MediaStyles = { [key: string]: Styles };
