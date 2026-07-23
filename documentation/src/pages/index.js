import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', 'text--center')} style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <img
          src="/img/logo.png"
          alt="Perceptible Logo"
          width="120"
          height="120"
          style={{ marginBottom: '1.5rem', borderRadius: '24px', backgroundColor: '#ffffff', padding: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__subtitle" >
          <Link href="/sample/multiple.html" target="_blank" className="button   button--lg">✨ See it in action with our Live Interactive Sample ✨</Link>
        </p>
        <div style={{ margin: '2rem 0' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/main"
            style={{ marginRight: '1rem' }}>
            Get Started 🚀
          </Link>
          <Link
            className="button button--outline button--light button--lg"
            to="/docs/examplemain">
            View Examples 💡
          </Link>
        </div>
        <div className="row" style={{ marginTop: '3rem' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Zero Dependencies',
    description: 'Standalone JS library designed for performance and zero external node dependencies.',
  },
  {
    title: 'Highly Configurable',
    description: 'Fine-tuned threshold control, custom offsets, spectator triggers, and event subscribers.',
  },
  {
    title: 'Browser Focus Visibility',
    description: 'Seamlessly leverages Page Visibility APIs to track element visibility and browser tab focus.',
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="featureCard text--center padding-horiz--md margin-bottom--md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Perceptible - High performance DOM element visibility tracking library">
      <HomepageHeader />
    </Layout>
  );
}
