// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['main', 'basicsample', 'perceptor'],
    },
    {
      type: 'category',
      label: 'Usage & Configuration',
      items: ['configuration', 'defaultconfig', 'configlevel'],
    },
    {
      type: 'category',
      label: 'Advanced Architecture',
      items: ['architecture', 'spectators', 'subscribers', 'schedulers'],
    },
  ],
  examplesSidebar: [
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examplemain',
        'examplemultiple',
        'exampleunwatch',
        'exampleconfig',
        'exampleoffset',
        'exampleclick',
        'examplespectator',
        'examplesubscribers',
      ],
    },
  ],
};

export default sidebars;
