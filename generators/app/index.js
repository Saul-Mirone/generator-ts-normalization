"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the remarkable ${chalk.red(
          "generator-ts-normalization"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager would you like to use?",
        choices: ["npm", "yarn"]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.packageManager;
      this.props = props;
    });
  }

  writing() {
    const copy = name =>
      this.fs.copy(this.templatePath(name), this.destinationPath(name));

    copy("tsconfig.json");
    copy(".prettierrc.js");
    copy(".eslintrc.js");
    copy(".eslintignore");
    copy(".editorconfig");
  }

  install() {
    const useNpm = this.props.packageManager === "npm";
    const installer = useNpm ? "npmInstall" : "yarnInstall";
    const options = useNpm ? { "save-dev": true } : { dev: true };
    if (this.props.packageManager === 0)
      this[installer](
        [
          "typescript",
          "@type-config/strict",
          "eslint",
          "prettier",
          "@typescript-eslint/eslint-plugin",
          "@typescript-eslint/parser",
          "eslint-config-prettier",
          "eslint-plugin-prettier",
          "eslint-plugin-promise"
        ],
        options
      );
    this.installDependencies({ npm: useNpm, bower: false, yarn: !useNpm });
  }
};
