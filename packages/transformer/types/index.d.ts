declare module "metro-config";

export {};

declare global {
  namespace NodeJS {
    interface Global {
      __TEST__: string;
    }
  }
}
