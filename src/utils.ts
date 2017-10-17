import * as mkdirp from 'mkdirp';
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { TranslationCollection, CompilerInterface } from './biesbjerg-ngx-translate-extract';
import { CompilerFactory } from './compiler.factory';

/**
 * Get all files in dir matching patterns
 */
export function readDir(dir: string, patterns: string[]): string[] {
  return patterns.reduce((results, pattern) => {
    return glob.sync(path.join(dir, pattern))
      .filter(path => fs.statSync(path).isFile())
      .concat(results);
  }, []);
}

export function save(collection: TranslationCollection, lang: string, format: string, output: string[]) {
  const compiler: CompilerInterface = CompilerFactory.create(format, {});

  output.forEach(output => {
    const normalizedOutput = normalizePath(output, compiler.extension, lang);
    let dir: string = normalizedOutput;
    let filename: string = `${lang}.${compiler.extension}`;
    if (!fs.existsSync(normalizedOutput) || !fs.statSync(normalizedOutput).isDirectory()) {
      dir = path.dirname(normalizedOutput);
      filename = path.basename(normalizedOutput);
    }

    const outputPath: string = path.join(dir, filename);
    collection = collection.sort();

    if (collection.count() > 0) {
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
      }
      fs.writeFileSync(outputPath, compiler.compile(collection));
    }
  });
}

export function normalizePath(output: string, extension: string, lang: string) {
  return path.resolve(output
    .replace('[lang]', lang)
    .replace('[ext]', extension));
}

export function merge(paths: string[], compiler: CompilerInterface,
                      collection = new TranslationCollection()): TranslationCollection {
  return paths
    .filter(p => path.extname(p) === `.${compiler.extension}`)
    .filter(p => fs.existsSync(p))
    .map(p => fs.readFileSync(p, 'utf-8'))
    .map(compiler.parse.bind(compiler))
    .reduce((acc: TranslationCollection, c: TranslationCollection) => {
      return acc.union(c);
    }, collection) as TranslationCollection;
}
