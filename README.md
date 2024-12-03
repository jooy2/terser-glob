# terser-glob

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/terser-glob/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/terser-glob) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/terser-glob) [![npm downloads](https://img.shields.io/npm/dm/terser-glob.svg)](https://www.npmjs.com/package/terser-glob) [![npm latest package](https://img.shields.io/npm/v/terser-glob/latest.svg)](https://www.npmjs.com/package/terser-glob) ![npm bundle size](https://img.shields.io/bundlephobia/min/terser-glob) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/terser-glob?style=social)

A CLI module that allows you to work with multiple files at once using the glob pattern in the terser cli.

[Terser](https://terser.org) It's the same as how to use CLI, but there are a few differences in this module.

- You can use the `glob` pattern for file paths (paths must be enclosed in quotes)

To learn how to use the Terser CLI, follow these links: https://github.com/terser/terser?tab=readme-ov-file#command-line-usage

## How-to-use

```text
terser-glob filePathOrGlobPattern [terser-cli-options]
```

```shell
# Example 1
$ terser-glob dist/index.js --mangle
# Example 2
$ terser-glob "dist/*.js"
# Example 3
$ terser-glob "dist/**/*.js" --ie8 --mangle
```

## Limitations & TODO

- Using multiple `glob` pattern arguments. Currently, only one argument is recognized.
- The `config-file` option does not currently work; each option must use a parameter.
- Some CLI options are not supported.
- Need a complex test.

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/terser-glob/issues).

You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2024 [CDGet](https://cdget.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
