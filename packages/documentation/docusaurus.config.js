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
    algolia: {
      apiKey: "d9f50f88ae43d8dc7176f5438648d669",
      indexName: "tw-rn",
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
          editUrl:
            "https://github.com/tw-rn/tw-rn/edit/master/packages/documentation/",
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
