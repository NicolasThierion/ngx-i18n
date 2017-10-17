/**
 * Offers injection of any previously extracted translation.
 */
import { Compiler } from 'webpack';
import { NgxTranslateMerger } from '../NgxTranslateMerger';
import { TranslatePlugin } from './ngx-translation-webpack';
import * as _ from 'lodash';

export class InjectorPlugin {
  _emit: string[];
  _merger: NgxTranslateMerger;
  constructor(options?: TranslatePlugin.InjectorOptions) {
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
