const inquirer = require('inquirer');

var questions = [
  {
    type: 'confirm',
    name: 'isHuman',
    message: 'Are you a human?',
    default: false,
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, '  '));
});
