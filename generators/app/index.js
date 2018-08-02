"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");
const path = require("path");

class ReactLib extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option("babel");
    }
}

module.exports = class extends ReactLib {
    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(
                "Welcome to PayScale's " +
                    chalk.red("payscale-module") +
                    " generator!"
            )
        );

        const prompts = [
            {
                type: "input",
                name: "name",
                message: "project name"
            },
            {
                type: "input",
                name: "description",
                message: "description"
            },
            {
                type: "input",
                name: "author",
                message: "author"
            },
            {
                type: "input",
                name: "repo",
                message: "repository"
            },
            {
                type: "list",
                name: "type",
                message: "project type",
                choices: ["React", "Vanilla JavaScript"]
            },
            {
                type: "list",
                name: "test",
                message: "testing framework",
                choices: ["mocha + chai", "jest"]
            },
            {
                type: "list",
                name: "css",
                message: "css processor",
                choices: ["css", "sass", "none"]
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    default() {
        if (path.basename(this.destinationPath()) !== this.props.name) {
            this.log(
                "Your generator must be inside a folder named " +
                    this.props.name +
                    "\n" +
                    "I'll automatically create this folder."
            );
            mkdirp(this.props.name);
            this.destinationRoot(this.destinationPath(this.props.name));
        }
    }

    writing() {
        mkdirp(this.destinationPath("src"));
        mkdirp(this.destinationPath("src/tests"));
        mkdirp(this.destinationPath("src/components"));
        mkdirp(this.destinationPath("src/styles"));
        
        this.fs.copy(
            this.templatePath("index.js"),
            this.destinationPath("src/index.js")
        );

        this.fs.copy(
            this.templatePath(".eslintrc"),
            this.destinationPath(".eslintrc")
        );
        this.fs.copy(
            this.templatePath(".gitignore"),
            this.destinationPath(".gitignore")
        );
        this.fs.copy(
            this.templatePath(".npmignore"),
            this.destinationPath(".npmignore")
        );
        this.fs.copy(
            this.templatePath("LICENSE"),
            this.destinationPath("LICENSE")
        );
        this.fs.copy(
            this.templatePath("testutils/dom.js"),
            this.destinationPath("testutils/dom.js")
        );
        this.fs.copy(
            this.templatePath("yourComponent.js"),
            this.destinationPath("src/components/yourComponent.js")
        );
        this.fs.copy(
            this.templatePath(".storybook"),
            this.destinationPath(".storybook")
        );
        this.fs.copy(
            this.templatePath("README.md"),
            this.destinationPath("README.md")
        );

        if(this.props.test === "mocha + chai") {
            this.fs.copy(this.templatePath("test_mocha.js"), this.destinationPath("src/tests/test.js"));

            var teamcitytest = "mocha -R min -r babel-register --reporter mocha-teamcity-reporter ./testutils/dom.js src/tests/*.js"
            var test = "mocha -R min -r babel-register --reporter progress ./testutils/dom.js src/tests/*.js"
        } else {
            this.fs.copy(this.templatePath("test_jest.js"), this.destinationPath("src/tests/test.js"));

            var teamcitytest = "jest --testResultsProcessor jest-teamcity-reporter src/tests/*.js"
            var test = "jest"
        }

        this.fs.copyTpl(this.templatePath("package.json"), this.destinationPath("package.json"),
            {
                name: this.props.name,
                description: this.props.description,
                author: this.props.author,
                repo: this.props.repo,
                teamcitytest: teamcitytest,
                test: test
            }
        );

        // copy gulp file
        this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
        this.npmInstall(['gulp@3.9.1', 'gulp-babel@6.1.2'], { 'save-dev': true, 'save-exect': true});

        // copy babel config and install react and babel libraries
        if (this.props.type === "React") {
            this.fs.copy(this.templatePath(".babelrc-react"), this.destinationPath(".babelrc"));
            
            this.npmInstall(['babel-preset-react@6.16.0', 'react-addons-test-utils@15.0.2', 'react-test-renderer@15.5.4', 'react-dom@15.6.1', 'enzyme@2.7.0'], { 'save-dev': true, 'save-exact': true })
            this.npmInstall(['prop-types@15.5.10', 'react@15.6.1'], { 'save': true, 'save-exact': true });
        }
        else {
            this.fs.copy(this.templatePath(".babelrc"), this.destinationPath(".babelrc"));
        }

        // copy webconfigs and style templates based on css processor
        if(this.props.css === "css") {
            this.fs.copyTpl(this.templatePath('webpack.config.css.js'), this.destinationPath('webpack.config.js'), { name: this.props.name });
            this.fs.copyTpl(this.templatePath('webpack.config.dev.css.js'), this.destinationPath('webpack.config.dev.js'), { name: this.props.name });
            
            this.fs.copy(
                this.templatePath("yourComponent.css"),
                this.destinationPath("src/styles/yourComponent.css")
            );
        }
        else if(this.props.css === "sass") {
            this.fs.copyTpl(this.templatePath('webpack.config.sass.js'), this.destinationPath('webpack.config.js'), { name: this.props.name });
            this.fs.copyTpl(this.templatePath('webpack.config.dev.sass.js'), this.destinationPath('webpack.config.dev.js'), { name: this.props.name });
            
            this.fs.copy(
                this.templatePath("yourComponent.scss"),
                this.destinationPath("src/styles/yourComponent.scss")
            );
        }
        else {
            this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), { name: this.props.name });
            this.fs.copyTpl(this.templatePath('webpack.config.dev.js'), this.destinationPath('webpack.config.dev.js'), { name: this.props.name });
        }

        
        // copy stories based on css processor
        if(this.props.css === "css") {
            this.fs.copyTpl(this.templatePath('stories/YourComponent.css.js'), this.destinationPath('stories/YourComponent.js'), { name: this.props.name });
        }
        else {
            this.fs.copyTpl(this.templatePath('stories/YourComponent.scss.js'), this.destinationPath('stories/YourComponent.js'), { name: this.props.name });
        }


        // install css libraries
        if(this.props.css === "css") {
            this.npmInstall(["css-loader@0.28.4", 'extract-text-webpack-plugin@2.1.0', 'optimize-css-assets-webpack-plugin@1.3.1'], { 'save-dev': true, 'save-exact': true });
        }
        else if(this.props.css === "sass") {
            this.npmInstall(["sass-loader@6.0.6", "css-loader@0.28.4", "node-sass@4.5.3", 'extract-text-webpack-plugin@2.1.0', 'optimize-css-assets-webpack-plugin@1.3.1'], { 'save-dev': true, 'save-exact': true });
        }

        // install testing libraries and copy test files
        if (this.props.test === "mocha + chai") {
            this.npmInstall(["chai@3.5.0", "expect@1.20.2", "mocha@2.5.3", "mocha-teamcity-reporter@1.1.1", "sinon@1.17.7"], { 'save-dev': true, 'save-exact': true});
        }
        else {
            this.npmInstall(['jest@19.0.2', 'babel-jest@19.0.0', 'jest-teamcity-reporter@0.6.2'], { 'save-dev': true, 'save-exact': true });
        }
    }

    install() {
        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false
        });
    }
};
