import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`${siteConfig.title}`} description="TailwindCSS in React Native">
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <img className={styles.logo} src="img/tw-rn-white.svg" alt="tw-rn logo" />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
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
      </header>
    </Layout>
  );
}

export default Home;
