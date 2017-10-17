import { Compiler, Plugin } from 'webpack';
import { NgxTranslateExtractor } from '../NgxTranslateExtractor';
import * as _ from 'lodash';
import { NgxTranslateMerger } from '../NgxTranslateMerger';
import { ExtractorPlugin } from './ExtractorPlugin';
import { InjectorPlugin } from './InjectorPlugin';

/**
 *
 */
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

  export const Injector = InjectorPlugin;

}

