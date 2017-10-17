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

export function save(collections: { [p: string]: TranslationCollection }, format: string, output: string[]) {
  const compiler: CompilerInterface = CompilerFactory.create(format, {});

  output.forEach(output => {
    for (const lang of Object.keys(collections)) {
      const notmalizedOutput = path.resolve(output
        .replace('[lang]', lang)
        .replace('[ext]', compiler.extension));
      let dir: string = notmalizedOutput;
      let filename: string = `${lang}.${compiler.extension}`;
      if (!fs.existsSync(notmalizedOutput) || !fs.statSync(notmalizedOutput).isDirectory()) {
        dir = path.dirname(notmalizedOutput);
        filename = path.basename(notmalizedOutput);
      }

      const outputPath: string = path.join(dir, filename);


      let processedCollection: TranslationCollection = collections[lang];
      processedCollection = processedCollection.sort();

      if (processedCollection.count() > 0) {
        if (!fs.existsSync(dir)) {
          mkdirp.sync(dir);
        }
        fs.writeFileSync(outputPath, compiler.compile(processedCollection));
      }
    }
  });
}
