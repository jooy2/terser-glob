#!/usr/bin/env node

import meow, { type Result, Options } from 'meow';
import { minify, type MinifyOptions, MinifyOutput } from 'terser';
import { glob } from 'glob';
import { join, dirname } from 'path';
import { access, readFile, writeFile, mkdir } from 'fs/promises';
import { constants } from 'fs';

const helpText: string = [
  'Usage',
  '  terser-glob path [terser-cli-options]',
  '',
  "  When using a glob rule in a path, you must use quotes. ('abc/*.js'...) ",
  '  -V, --version                            output the version number',
  '  -p, --parse <options>                    Specify parser options.',
  '  -c, --compress [options]                 Enable compressor/specify compressor options.',
  '  -m, --mangle [options]                   Mangle names/specify mangler options.',
  '  --mangle-props [options]                 Mangle properties/specify mangler options.',
  '  -f, --format [options]                   Format options.',
  '  -b, --beautify [options]                 Alias for --format.',
  '  -o, --output <file>                      Output file (default STDOUT).',
  '  --comments [filter]                      Preserve copyright comments in the output.',
  '  --config-file <file>                     Read minify() options from JSON file.',
  '  --ecma <version>                         Specify ECMAScript release: 5, 2015, 2016 or 2017...',
  '  -e, --enclose [arg[,...][:value[,...]]]  Embed output in a big function with configurable arguments and values.',
  '  --ie8                                    Support non-standard Internet Explorer 8.',
  '  --keep-classnames                        Do not mangle/drop class names.',
  '  --keep-fnames                            Do not mangle/drop function names. Useful for code relying on Function.prototype.name.',
  '  --module                                 Input is an ES6 module',
  '  --name-cache <file>                      File to hold mangled name mappings.',
  '  --safari10                               Support non-standard Safari 10.',
  '  --source-map [options]                   Enable source map/specify source map options.',
  '  --toplevel                               Compress and/or mangle variables in toplevel scope.',
  // From `terser-glob`
  '  --debug                                  Print job progress to the console',
  '  -h, --help                               output usage information'
].join('\n');

const meowOptions: Options<any> = {
  importMeta: import.meta,
  help: helpText
};

const cli: Result<any> = meow(meowOptions);

function print(message: string): void {
  process.stdout.write(message);
}

async function isFileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function run(): Promise<void> {
  if (!cli) {
    throw new Error('Unknown error');
  }

  if (cli.flags.version || cli.flags.V) {
    print(
      `terser-glob does not provide version information; check the modules you have installed.`
    );
    return;
  }

  if (cli.input?.length < 1) {
    throw new Error('No input file specified');
  }

  const inputFilePaths = [];

  for (let i = 0; i < cli.input.length; i += 1) {
    inputFilePaths[i] = cli.input[i].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }

  const files = await glob(inputFilePaths, {
    cwd: process.cwd()
  });

  const configFilePath: string | undefined = (cli.flags.configFile as string) || undefined;

  const defaultConfigs: MinifyOptions = JSON.parse(
    JSON.stringify({
      ecma: cli.flags.ecma || undefined,
      enclose: cli.flags.enclose || cli.flags.e || false,
      parse: cli.flags.parse || cli.flags.p || {},
      compress: cli.flags.compress || cli.flags.c || {},
      mangle: cli.flags.mangle || cli.flags.m || true,
      module: cli.flags.module || false,
      format: cli.flags.beautify || cli.flags.b || cli.flags.format || cli.flags.f || null,
      sourceMap: cli.flags.sourceMap || false,
      toplevel: cli.flags.toplevel || false,
      nameCache: cli.flags.nameCache || null,
      ie8: cli.flags.ie8 || false,
      keep_classnames: cli.flags.keepClassnames || undefined,
      keep_fnames: cli.flags.keepFnames || false,
      safari10: cli.flags.safari10 || false
    })
  );

  if (configFilePath) {
    try {
      const configFileContent = await readFile(configFilePath, 'utf-8');
      const jsonData = JSON.parse(configFileContent);

      for (let i = 0; i < Object.entries(jsonData).length; i += 1) {
        const [key, value] = Object.entries(jsonData)[i];

        // @ts-ignore
        defaultConfigs[key] = value;
      }
    } catch (err) {
      throw new Error(`Error reading or parsing the configuration file: ${err}`);
    }
  }

  if (cli.flags.debug) {
    print(JSON.stringify(defaultConfigs, null, 2));
  }

  for (let i = 0; i < files.length; i += 1) {
    const fileName = files[i];
    let filePath = fileName;

    if (cli.flags.output || cli.flags.o) {
      filePath = join((cli.flags.output || cli.flags.o) as string, fileName);
    }

    const originalCode: any = {};
    originalCode[fileName] = await readFile(fileName, 'utf-8');

    const minifyResult: MinifyOutput = await minify(originalCode, defaultConfigs);

    const fileDirectory = dirname(filePath);

    if (!(await isFileExists(fileDirectory))) {
      await mkdir(fileDirectory, { recursive: true });
    }

    if (minifyResult.code) {
      await writeFile(filePath, minifyResult.code);
    }
  }
}

run();
