#! /usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

const nodeExpress = require('./configs/node-express');
const staticConfig = require('./configs/static');
const fef = require('./configs/fef');

const nowPath = path.join(process.cwd(), 'now.json');
const existingConfig = fs.existsSync(nowPath);

const buildConfig = async () => {
  let config = {
    version: 2,
  };

  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of the project?',
      default: path.basename(process.cwd()),
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of project?',
      choices: ['node-express', 'static', 'react', 'vue', 'static-build'],
    },
  ]);

  config.name = answers.name;
  switch (answers.type) {
    case 'node-express':
      config = await nodeExpress(config);
      break;
    case 'static':
      config = await staticConfig(config);
      break;
    case 'react':
      config = await fef(config, 'build');
      break;
    case 'vue':
    case 'static-build':
      config = await fef(config);
      break;
    default:
      break;
  }
  const moreAnswers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'specifyAlias',
      message: 'Would like to specify an alias?',
      default: true,
    },
    {
      type: 'text',
      name: 'alias',
      message: 'What is the alias? (Specify multiple separated by commas)',
      default: answers.name,
      when: (a) => a.specifyAlias,
    },
  ]);

  if (moreAnswers.alias)
    config.alias = moreAnswers.alias.split(',').map((a) => a.trim());
  fs.writeFileSync(nowPath, JSON.stringify(config, null, 2), 'utf8');
  console.log('All done! 🎉 Type "now" to deploy!');
  process.exit(0);
};

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'now.json already exists! Would you like to overwrite it?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('Bye bye! 👋🏼');
      }
    });
} else {
  buildConfig();
}
