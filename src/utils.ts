import * as mkdirp from 'mkdirp';
import * as glob from 'glob';
import * as fs from 'fs';
import * as PATH from 'path';
import { CompilerInterface } from './biesbjerg-ngx-translate-extract';
import { CompilerFactory } from './compiler.factory';
import { ExtendedTranslationCollection } from './ExtendedTranslationCollection ';

/**
 * Get all files in dir matching patterns
 */
export function readDir(dir: string, patterns: string[]): string[] {
  return patterns.reduce((results, pattern) => {
    return glob.sync(PATH.join(dir, pattern))
      .filter(path => fs.statSync(path).isFile())
      .concat(results);
  }, []);
}

export function save(collection: ExtendedTranslationCollection, lang: string, format: string, output: string) {
  const compiler: CompilerInterface = CompilerFactory.create(format, {});

  const normalizedOutput = normalizePath(output, compiler.extension, lang);
  let dir: string = normalizedOutput;
  let filename: string = `${lang}.${compiler.extension}`;
  if (!fs.existsSync(normalizedOutput) || !fs.statSync(normalizedOutput).isDirectory()) {
    dir = PATH.dirname(normalizedOutput);
    filename = PATH.basename(normalizedOutput);
  }

  const outputPath: string = PATH.join(dir, filename);
  collection = collection.sort();

  if (collection.count() > 0) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    fs.writeFileSync(outputPath, compiler.compile(collection));
  }
}

export function normalizePath(output: string, extension: string, lang: string) {
  return PATH.resolve(output
    .replace('[lang]', lang)
    .replace('[ext]', extension));
}

