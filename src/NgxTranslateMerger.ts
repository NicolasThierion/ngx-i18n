import * as _ from 'lodash';
import { readDir, save } from './utils';
import * as globToRegExp from 'glob-to-regexp'
import { CompilerFactory } from './compiler.factory';
import { ExtendedTranslationCollection } from './ExtendedTranslationCollection ';
import { CompilerInterface } from './biesbjerg-ngx-translate-extract';
import * as fs from 'fs';
import * as path from 'path';

export class NgxTranslateMerger {
  public translations: { [p: string]: ExtendedTranslationCollection };
  private _options: NgxTranslateMerger.MergerOptions;

  constructor(options: NgxTranslateMerger.MergerOptions = {}) {

    // merge with default options
    this._options = _.defaults(options, {
      input: ['./src'],
      patterns: [`**/i18n/*.[lang].po`, `**/i18n/*.[lang].json`],
      output: ['src/assets/i18n/[lang].[ext]'],
      format: 'json'
    });
  }

  execute() {
    const o = this._options as any;
    const translationFiles = this._findTranslationFiles();
    const languagesMap = this._findLanguages(translationFiles);

    this.translations = this._extractTranslationCollections(languagesMap);
    for (const lang of Object.keys(this.translations)) {
      o.output.forEach(ot => {
        save(this.translations[lang], lang, o.format, ot);
      })
    }
  }

  getFormat() {
    return this._options.format;
  }

  private _findLanguages(files: string[]): { [key: string]: string[] } {
    const regexes = (this._options as any).patterns
      .map(s => s.replace('[lang]', '_lang_'))
      .map(globToRegExp)
      .map(r => r.source)
      .map(s => s.replace('_lang_', '(.*)'));

    // infer available languages from found translation files
    return files.reduce((values, filename) => {
      regexes
        .map(re => filename.match(re))
        .filter(match => !!match)
        .forEach(match => {
          const path = match[0];
          const lang = match[1];
          if (!values[lang]) {
            values[lang] = [];
          }
          values[lang].push(path);
        });
      return values;
    }, {});
  }

  private _findTranslationFiles() {
    const o = this._options as any;
    const files: string[] = [];
    const pattern = o.patterns.map(s => s.replace('[lang]', '*'));

    o.input.forEach(dir => {
      readDir(dir, pattern)
        .forEach(p => {
          files.push(p);
        })
    });
    return files;
  }

  private _extractTranslationCollections(translationFiles: { [key: string]: string[] }): { [key: string]: ExtendedTranslationCollection } {
    const compilers = [
      CompilerFactory.create('pot', {}),
      CompilerFactory.create('json', {})
    ];
    const collections = {};
    for (const lang of Object.keys(translationFiles)) {
      const paths = translationFiles[lang];

      for (const compiler of compilers) {
        collections[lang] = merge(paths, compiler, collections[lang]);
      }
    }

    return collections;
  }
}

function merge(paths: string[], compiler: CompilerInterface,
                      collection = new ExtendedTranslationCollection()): ExtendedTranslationCollection {
  return paths
    .filter(p => path.extname(p) === `.${compiler.extension}`)
    .filter(p => fs.existsSync(p))
    .map(p => fs.readFileSync(p, 'utf-8'))
    .map(content => {
      return compiler.parse.bind(compiler)(content);
    })
    .reduce((acc: ExtendedTranslationCollection, c: ExtendedTranslationCollection) => {
      return acc.union(c);
    }, collection) as ExtendedTranslationCollection;
}

export namespace NgxTranslateMerger {

  export interface MergerOptions {
    input?: string[];
    pattern?: string;
    output?: string[];
    format?: 'json' | 'po';
  }
}
