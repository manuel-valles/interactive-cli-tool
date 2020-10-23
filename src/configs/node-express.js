const inquirer = require('inquirer');
const path = require('path');

const baseConfig = {
  builds: [
    {
      src: 'src/index.js',
      use: '@now/node-server',
    },
  ],
  routes: [{ src: '/.*', dest: 'src/index.js' }],
};

const nodeExpress = async (config) => {
  let main = 'src/index.js';
  try {
    // eslint-disable-next-line
    const packageJSON = require(path.join(process.cwd(), '/package.json'));
    main = packageJSON.main;
    // eslint-disable-next-line
  } catch (error) {}

  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'main',
      message: 'What is the path to your express entry point?',
      default: main,
    },
  ]);
  baseConfig.builds[0].src = answers.main;
  baseConfig.routes[0].dest = answers.main;
  return {
    ...config,
    ...baseConfig,
  };
};

module.exports = nodeExpress;
