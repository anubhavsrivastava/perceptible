// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Perceptible',
  tagline: 'Detect visibility of DOM elements seamlessly',
  favicon: 'img/favicon.ico',

  url: 'https://perceptible.js.org',
  baseUrl: '/',

  organizationName: 'anubhavsrivastava',
  projectName: 'perceptible',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/anubhavsrivastava/perceptible/tree/master/documentation/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        style: 'primary',
        title: 'Perceptible',
        logo: {
          alt: 'Perceptible Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docSidebar',
            sidebarId: 'examplesSidebar',
            position: 'left',
            label: 'Examples',
          },
          {
            href: 'https://github.com/anubhavsrivastava/perceptible',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/main',
              },
              {
                label: 'Configuration',
                to: '/docs/configuration',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter / X',
                href: 'https://twitter.com/onlyanubhav',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/anubhavsrivastava/perceptible',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
