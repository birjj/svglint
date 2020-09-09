# SVGLint

Lints SVG files. Can be run as a commandline utility, or as a NodeJS library.

<p align="center"><img src="/example.png" alt="Example of a commandline execution"/></p>

## Usage

The tool can be used as a commandline tool by executing the CLI.
If installed as a dependency by NPM this will be found at `./node_modules/.bin/svglint`.
If installed globally by NPM it can be executed directly as `svglint`.

```
$ svglint --help

  Linter for SVGs

  Usage:
      svglint [--config config.js] [--ci] [--debug] file1.svg file2.svg

  Options:
      --help        Display this help text
      --version     Show the current SVGLint version
      --config, -c  Specify the config file. Defaults to '.svglintrc.js'
      --debug,  -d  Show debug logs
      --ci, -C      Only output to stdout once, when linting is finished
```

The tool can also be used through the JS API.

```javascript
const SVGLint = require("svglint");
const linting = SVGLint.lintSource("<svg>...</svg>", {
    // ... config goes here
});
linting.on("done", () => {
    if (!linting.valid) {
        console.log("You've been a naughty boy!");
    }
});
```

## Config

In order to specify what should be linted SVGLint must be given a configuration object.
If you are using the CLI, this configuration object is read from the file specified by `--config`. This defaults to `.svglintrc.js`, which will be searched for up through the directory tree - this is similar to tools such as ESLint.

This configuration file should export a single object, of the format:

```javascript
module.exports = {
    // additional configuration may go here in the future
    // for now, "rules" is the only useful key
    rules: {
        elm: [{
            // config 1 for the "elm" rule
        }, {
            // config 2 for the "elm" rule
        }],
        attr: {
            // config 1 for the "attr" rule
        },
        custom: [
            function() { // config 1 for the "custom" rule }
        ]
    }
};
```

For specifics on how the config for each rule should be formatted, see [their specific rule files](https://github.com/birjolaxew/svglint/tree/master/src/rules).

If you are using the JS API, this configuration object is passed as the second parameter.

