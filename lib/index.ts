#!/usr/bin/env node

import meow from 'meow';
import type { Options } from 'meow';
import { minify } from 'terser';
import type { MinifyOutput } from 'terser';
import { glob } from 'glob';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

const helpText: string = [
  'Usage',
  '  terser-glob path [terser-cli-options]',
  '',
  "  When using a glob rule in a path, you must use quotes. ('abc/*.js'...) "
].join('\n');

const meowOptions: Options<any> = {
  importMeta: import.meta,
  help: helpText
};

const cli = meow(meowOptions);

async function run(): Promise<void> {
  if (!cli.input[0]) {
    throw new Error('No input file specified');
  }

  const currentPath = cli.input[0].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  const files = await glob(currentPath, {
    cwd: process.cwd()
  });

  for (let i = 0; i < files.length; i += 1) {
    const fileName = files[i];
    const outputPath: any = cli.flags.output || cli.flags.o;

    const newFilePath = outputPath ? join(outputPath, fileName) : fileName;

    const originalCode: any = {};
    originalCode[fileName] = await readFile(fileName, 'utf-8');

    const minifyResult: MinifyOutput = await minify(
      originalCode,
      JSON.parse(
        JSON.stringify({
          ecma: cli.flags.ecma || undefined,
          enclose: cli.flags.enclose || cli.flags.e || false,
          parse: cli.flags.parse || cli.flags.p || {},
          compress: cli.flags.compress || cli.flags.c || {},
          mangle: cli.flags.mangle || cli.flags.m || true,
          module: cli.flags.module || false,
          format: cli.flags.format || cli.flags.f || null,
          sourceMap: cli.flags['source-map'] || false,
          toplevel: cli.flags.toplevel || false,
          nameCache: cli.flags['name-cache'] || null,
          ie8: cli.flags.ie8 || false,
          keep_classnames: cli.flags['keep-classnames'] || undefined,
          keep_fnames: cli.flags['keep-fnames'] || false,
          safari10: cli.flags.safari10 || false
        })
      )
    );

    if (minifyResult.code) {
      await writeFile(newFilePath, minifyResult.code);
    }
  }
}

run();
