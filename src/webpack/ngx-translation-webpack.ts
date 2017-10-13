import { Compiler, Plugin } from 'webpack';
import { NgxTranslateExtractor } from './NgxTranslateExtractor';
import * as _ from 'lodash';
import { NgxTranslateMerger } from './NgxTranslateMerger';
import { ExtractorPlugin } from './ExtractorPlugin';

export namespace TranslatePlugin {

  export interface ExtractorOptions {
    input?: string[];         // path to search for translations to extract
    output?: string[];        // where to store translations files
    format?: 'json' | 'po',   // output format
    relativeOutput?: boolean; // if set to true, output relative to files where translations have been extracted
    languages?: string[];     // for which languages should generate files ?
  }

  export interface InjectorOptions extends NgxTranslateMerger.MergerOptions {}

  /**
   * Offers extraction of translations from HTML & JS, when compiling the sources.
   */
  export class Extractor {
    public html: Plugin;
    public js: Plugin;

    constructor(options: ExtractorOptions = {}) {
      this.html = new ExtractorPlugin(new NgxTranslateExtractor(_.merge(options, {
        patterns: ['/**/*.html']
      })));

      this.js = {
        apply: (compiler: Compiler) => {
          compiler.plugin('compile', compilation => {
            // TODO extract translations from JS.
            throw new Error('not implemented')
          });
        }
      }
    }
  }

  /**
   * Offers injection of any previously extracted translation.
   */
  export class Injector {
    _emit: string[];
    _merger: NgxTranslateMerger;
    constructor(options?: InjectorOptions) {
      options = options || {};

      // void output, and rather emit to webpack bundle
      this._emit = _.defaults(options.output, ['assets/i18n/[lang].[ext]']);
      options.output = [];
      this._merger = new NgxTranslateMerger(options);
    }

    apply(compiler: Compiler) {
      compiler.plugin('emit', (compilation, callback) => {
        this._merger.execute();
        const format = this._merger.getFormat();
        const output = this._merger.translations;
        Object.keys(output)
          .forEach(lang => {
            const translationStr: string = JSON.stringify(output[lang].values);

            // emit translation files to bundle
            this._emit.forEach(emit => {
              const filename = emit
                .replace('[lang]', `${lang}`)
                .replace('[ext]', `${format}`);

              compilation.assets[`${filename}`] = {
                source: () => translationStr,
                size: () => translationStr.length
              }
            });
        });

        callback();
      });
    }
  }
}

