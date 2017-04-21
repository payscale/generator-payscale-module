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

    createReadMe() {}

    copyLicense() {}

    copyPackageJson() {}

    copyWebpack() {}

    copyConfigs() {
        // babel, npmignore, gitignore, eslint
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
        var reactDevDependencies = "";
        var reactDependencies = "";
        var testingDependencies = "";

        mkdirp(this.destinationPath("src"));
        mkdirp(this.destinationPath("src/tests"));
        this.fs.copy(
            this.templatePath("index.js"),
            this.destinationPath("src/index.js")
        );

        this.fs.copy(
            this.templatePath("test.js"),
            this.destinationPath("src/tests/test.js")
        );

        this.fs.copy(
            this.templatePath(".eslintrc"),
            this.destinationPath(".eslintrc")
        );
        this.fs.copy(
            this.templatePath(".gitignore"),
            this.destinationPath("gitignore")
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

        if (this.props.type === "React") {
            this.fs.copy(
                this.templatePath(".babelrc-react"),
                this.destinationPath(".babelrc")
            );
            reactDependencies = '"prop-types": "15.5.8", "react": "15.5.4"';
            reactDevDependencies =
                '"babel-preset-react": "6.16.0", "react-addons-test-utils": "15.0.2", "react-test-renderer": "15.5.4", "react-dom": "15.4.2","enzyme": "~2.7.0"';
        } else {
            this.fs.copy(
                this.templatePath(".babelrc"),
                this.destinationPath(".babelrc")
            );
        }

        if (this.props.test === "mocha + chai") {
            testingDependencies =
                '"chai": "3.5.0", "expect": "1.20.2", "mocha": "2.5.3", "mocha-teamcity-reporter": "1.1.1", "sinon": "1.17.7"';
        } else {
            testingDependencies = '"jest": "19.0.2"';
        }

        this.fs.copyTpl(
            this.templatePath("package.json"),
            this.destinationPath("package.json"),
            {
                name: this.props.name,
                description: this.props.description,
                author: this.props.author,
                repo: this.props.repo,
                reactDevDependencies: reactDevDependencies,
                reactDependencies: reactDependencies,
                testingDependencies: testingDependencies
            }
        );

        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js"),
            {
                name: this.props.name
            }
        );

        //let jsonPackage = this.fs.readJSON(this.templatePath('package.json'));
        //this.fs.writeJSON(this.destinationPath('package.json'), jsonPackage);
    }

    install() {
        this.installDependencies();
    }
};
