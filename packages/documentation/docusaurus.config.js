module.exports = {
  title: "tw-rn",
  tagline: "TailwindCSS in React Native",
  url: "https://tw-rn.github.io",
  baseUrl: "/tw-rn/",
  favicon: "img/logo.svg",
  organizationName: "tw-rn", // Usually your GitHub org/user name.
  projectName: "tw-rn", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "",
      logo: {
        alt: "tw-rn Logo",
        src: "img/logo.svg",
      },
      links: [
        {
          to: "docs/fundamentals/getting-started",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/tw-rn/tw-rn",
          label: "GitHub",
          position: "right",
        },
      ],
      // algolia: {
      //   apiKey: "392b163f8c19c61b8df58a122fbd9b9f",
      //   indexName: "prod_tw-rn",
      //   appId: "438IRBTI60", // Optional, if you run the DocSearch crawler on your own
      //   algoliaOptions: {}, // Optional, if provided by Algolia
      // },
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} tw-rn`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "docs/fundamentals/getting-started",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/tw-rn/tw-rn/edit/master/packages/documentation/",
          remarkPlugins: [],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  scripts: [
    {
      src: "https://snack.expo.io/embed.js",
      // async: true,
    },
  ],
};
