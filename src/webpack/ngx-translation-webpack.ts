import { Log } from './log';
import { Compiler, Plugin } from 'webpack';
import { NgxTranslateExtractor } from './NgxTranslateExtractor';
import * as _ from 'lodash';
import { NgxTranslateMerger } from './NgxTranslateMerger';

export namespace TranslatePlugin {
  export interface ExtractorOptions {
    input?: string[];
    output?: string[];
    format?: 'json' | 'po',
    relativeOutput?: boolean;
    languages?: string[];
  }

  export interface InjectorOptions extends NgxTranslateMerger.MergerOptions {}

  /**
   * Offers extraction of translations from HTML & JS, when compiling the sources.
   */
  export class Extractor {
    public html: Plugin;
    public js: Plugin;

    constructor(options: ExtractorOptions = {}) {
      const patterns = ['/**/*.html'];
      const htmlExtractor = new NgxTranslateExtractor(_.merge(options, {
        patterns
      }));
      Log.debug(`extraction of translations from ${patterns}`);

      this.html = {
        apply: (compiler: Compiler) => {
          compiler.plugin('compile', compilation => {
            htmlExtractor.execute();
          });
        }
      };

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
      this._emit = _.defaults(options.output, ['gen/i18n/[lang].[ext]']);
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

