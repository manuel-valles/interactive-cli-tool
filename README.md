# Interactive CLI Tool

An Interactive CLI Tool with Node.js

## Idea

This will be useful for the **now-config** file. This CLI Tool will help generate a _now.sh_ configuration file.

- **Now/Vercel** Docs: https://vercel.com/docs

## Usage

```sh
now-config
```

## Library

There are so many libraries to use for user interaction. Some of them are:

- _Inquirer_: https://github.com/SBoudrias/Inquirer.js/
- _Caporal_: https://github.com/mattallty/Caporal.js
- _Yargs Interactive_: https://github.com/nanovazquez/yargs-interactive

Example for the library used in this project (_Inquirer_):

- https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/pizza.js

- **Dev Dependencies**

  ```
  $ npx eslint --init

   ✔ How would you like to use ESLint? · style
  ✔ What type of modules does your project use? · commonjs
  ✔ Which framework does your project use? · none
  ✔ Does your project use TypeScript? · No / Yes
  ✔ Where does your code run? · browser
  ✔ How would you like to define a style for your project? · guide
  ✔ Which style guide do you want to follow? · airbnb
  ✔ What format do you want your config file to be in? · JavaScript
  ```

### NOTES:

- To test the development of the _package/module_ locally:
  - Add the **bin** to the package.json:
  ```json
  {
    "bin": {
      "now-config": "src/index.js"
    }
  }
  ```
  - Specifiy the specific interpreter on the top of the main file (_inde.js_)
  ```js
    #! /usr/bin/env node
  ```
  - `$ npm link` -> it will install globally for the current directory;
  - `$ interactive-cli-tool` -> it will run the module in the current directory;
  - To remove the npm link, since `$ npm unlink` is not working, use: `$ npm uninstall -g interactive-clit-tool`.
