import { resolve } from "path";

const nextAdapter = (nextConfig: any = {}) => {
  return {
    ...nextConfig,
    webpack: (config: any, options: any) => {
      const rules = config.module.rules || [];

      rules.unshift({
        test: /\.css/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: require.resolve("@tw-rn/loader"),
            // loader: resolve(__dirname, "loader.js"),
          },
        ],
      });

      config.module.rules = rules;

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
};

export default nextAdapter;
