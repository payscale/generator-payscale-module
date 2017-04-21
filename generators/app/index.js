'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

class ReactLib extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel');
    }

    createReadMe() {

    }

    copyLicense() {

    }

    copyPackageJson() {

    }

    copyWebpack() {

    }

    copyConfigs() {
        // babel, npmignore, gitignore, eslint
    }
}

module.exports = class extends ReactLib {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to PayScale's " + chalk.red('payscale-module') + ' generator!'
    ));

    const prompts = [
        {
            type: 'input',
            name: 'name',
            message: 'project name'
        },
        {
            type: 'input',
            name: 'description',
            message: 'description'
        },
        {
            type: 'input',
            name: 'author',
            message: 'author'
        },
        {
            type: 'input',
            name: 'repo',
            message: 'repository',
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'keywords'
        },
        {
            type: 'list',
            name: 'type',
            message: 'project type',
            choices: ['React', 'Vanilla JavaScript']
        },
        {
            type: 'list',
            name: 'test',
            message: 'testing framework',
            choices: ['mocha + chai', 'jest']
        }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('eslintrc'),  this.destinationPath(`${this.props.name}/.eslintrc`));
    // this.fs.copy('.gitignore', `${this.props.name}/.gitignore`);
    // this.fs.copy('.npmignore', `${this.props.name}/.npmignore`);
    // this.fs.copy('LICENSE', `${this.props.name}/LICENSE`);
    // this.fs.copy('testutils/dom.js', `${this.props.name}/testutils/dom.js`);
    //
    // if(this.props.type === 'React') {
    //     this.fs.copy('.babelrc-react', `${this.props.name}/.babelrc`);
    // }
    // else {
    //     this.fs.copy('.babelrc', `${this.props.name}/.babelrc`);
    // }
  }

  install() {
    this.installDependencies();
  }
};
