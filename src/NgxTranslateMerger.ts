import * as _ from 'lodash';
import { readDir, save } from './utils';
import * as globToRegExp from 'glob-to-regexp'
import { TranslationCollection } from './biesbjerg-ngx-translate-extract'
import * as fs from 'fs';
import * as path from 'path';
import { CompilerFactory } from './compiler.factory';

export class NgxTranslateMerger {
  public translations: { [p: string]: TranslationCollection };
  private _options: NgxTranslateMerger.MergerOptions;

  constructor(options: NgxTranslateMerger.MergerOptions = {}) {

    // merge with default options
    this._options = _.defaults(options, {
      input: ['./src'],
      patterns: [`**/i18n/*.[lang].po`, `**/i18n/*.[lang].json`],
      output: ['assets/i18n/[lang].[ext]'],
      format: 'json'
    });
  }

  execute() {
    const o = this._options as any;
    const translationFiles = this._findTranslationFiles();
    const languagesMap = this._findLanguages(translationFiles);

    this.translations = this._extractTranslationCollections(languagesMap);
    save(this.translations, o.format, o.output);
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

  private _extractTranslationCollections(translationFiles: { [key: string]: string[] }): { [key: string]: TranslationCollection } {
    const compilers = [
      CompilerFactory.create('pot', {}),
      CompilerFactory.create('json', {})
    ];
    const collections = {};
    for (const lang of Object.keys(translationFiles)) {
      const paths = translationFiles[lang];
      collections[lang] = new TranslationCollection();
      for (const compiler of compilers) {

        collections[lang] = paths
          .filter(p => path.extname(p) === `.${compiler.extension}`)
          .map(p => fs.readFileSync(p, 'utf-8'))
          .map(compiler.parse.bind(compiler))
          .reduce((acc: TranslationCollection, c: TranslationCollection) => acc.union(c), collections[lang]);
      }
    }

    return collections;
  }
}

export namespace NgxTranslateMerger {

  export interface MergerOptions {
    input?: string[];
    pattern?: string;
    output?: string[];
    format?: 'json' | 'po';
  }
}