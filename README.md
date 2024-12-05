# terser-glob

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/terser-glob/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/terser-glob) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/terser-glob) [![npm downloads](https://img.shields.io/npm/dm/terser-glob.svg)](https://www.npmjs.com/package/terser-glob) [![npm latest package](https://img.shields.io/npm/v/terser-glob/latest.svg)](https://www.npmjs.com/package/terser-glob) ![npm bundle size](https://img.shields.io/bundlephobia/min/terser-glob) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/terser-glob?style=social)

A CLI module that allows you to work with multiple files at once using the glob pattern in the terser cli.

To learn how to use the Terser CLI, follow these links: https://github.com/terser/terser?tab=readme-ov-file#command-line-usage

## How-to-use

[Terser](https://terser.org) It's the same as how to use CLI, but there are a few differences in this module.

- You can use the `glob` pattern for file paths (paths must be enclosed in quotes). You can also specify each file individually without using the glob pattern.
- If an output path is set, it must be a directory. We currently do not support combining multiple files into one.

```text
terser-glob filePathOrGlobPattern [terser-cli-options]
```

```shell
# Example 1
$ terser-glob dist/index.js dist/hello.js dist/world.js --mangle
# Example 2
$ terser-glob "dist/*.js" dist/hello.js
# Example 3
$ terser-glob "dist/**/*.js" --ie8 --mangle --output result/
# Example 4
$ terser-glob "dist/abc/*.js" "dist/def/*" --config-file terser.config.json
```

```shell
Usage: terser-glob [options] [files...]

Options:
  -V, --version                            output the version number
  -p, --parse <options>                    Specify parser options.
  -c, --compress [options]                 Enable compressor/specify compressor options.
  -m, --mangle [options]                   Mangle names/specify mangler options.
  --mangle-props [options]                 Mangle properties/specify mangler options.
  -f, --format [options]                   Format options.
  -b, --beautify [options]                 Alias for --format.
  -o, --output <file>                      Output file (default STDOUT).
  --comments [filter]                      Preserve copyright comments in the output.
  --config-file <file>                     Read minify() options from JSON file.
  --ecma <version>                         Specify ECMAScript release: 5, 2015, 2016 or 2017...
  -e, --enclose [arg[,...][:value[,...]]]  Embed output in a big function with configurable arguments and values.
  --ie8                                    Support non-standard Internet Explorer 8.
  --keep-classnames                        Do not mangle/drop class names.
  --keep-fnames                            Do not mangle/drop function names. Useful for code relying on Function.prototype.name.
  --module                                 Input is an ES6 module
  --name-cache <file>                      File to hold mangled name mappings.
  --safari10                               Support non-standard Safari 10.
  --source-map [options]                   Enable source map/specify source map options.
  --toplevel                               Compress and/or mangle variables in toplevel scope.
  -h, --help                               output usage information
```

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/terser-glob/issues).

You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2024 [CDGet](https://cdget.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
