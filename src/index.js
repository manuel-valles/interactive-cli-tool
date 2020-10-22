const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

const existingConfig = fs.existsSync('now.json');

const buildConfig = () => {
  const questions = [
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
      choices: [
        'node-express',
        'static',
        'react',
        'vue',
        'static-build',
        'lambda',
      ],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
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
