import React, { useEffect } from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import GitHubButton from "react-github-btn";
import styles from "./styles.module.css";

const embeded = `
<div data-snack-id="@ericktamayo/tw-rn" data-snack-platform="web" data-snack-preview="true" data-snack-theme="dark" style="overflow:hidden;background:#212733;border:1px solid rgba(0,0,0,.08);border-radius:4px;height:100%;width:100%"></div>
`;

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  useEffect(() => {
    if (window.ExpoSnack) window.ExpoSnack.initialize();
  }, []);

  return (
    <Layout title={`${siteConfig.title}`} description="TailwindCSS in React Native">
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className={styles.titleContainer}>
          <div>
            <img className={styles.logo} src="img/tw-rn-white.svg" alt="tw-rn logo" />
            <div className={styles.ghButton}>
              <GitHubButton
                href="https://github.com/tw-rn/tw-rn"
                data-size="large"
                data-show-count="true"
                aria-label="Star tw-rn/tw-rn on GitHub"
              >
                Star
              </GitHubButton>
            </div>

            <div className={styles.buttons}>
              <Link
                className={classnames(
                  styles.getStarted,
                  "button button--outline button--secondary button--lg"
                )}
                to={useBaseUrl("docs/fundamentals/getting-started")}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.snack} dangerouslySetInnerHTML={{ __html: embeded }} />
      </header>
    </Layout>
  );
}

export default Home;
