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
    merger: NgxTranslateMerger;

    constructor(options?: InjectorOptions) {
      this.merger = new NgxTranslateMerger(options);
    }

    apply(compiler: Compiler) {
      compiler.plugin('emit', (compilation, callback) => {
        this.merger.execute();
        callback();
      });
    }
  }
}

