/**
 * Offers merge & injection of any previously extracted translation.
 */
import { Compiler } from 'webpack';
import { NgxTranslateMerger } from '../NgxTranslateMerger';
import { TranslatePlugin } from './ngx-translation-webpack';
import * as _ from 'lodash';

export class MergerPlugin {
  _emit: string[];
  _merger: NgxTranslateMerger;
  constructor(options?: TranslatePlugin.MergerOptions) {
    options = _checkOptions(options);


    if (options.emitOnly) {
      // void output, and rather emit to webpack bundle
      this._emit = options.output as string[];
      options.output = [];
    } else {
      this._emit = [];
    }
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


function _checkOptions(options?: TranslatePlugin.MergerOptions): TranslatePlugin.MergerOptions {
  options = _.defaults(options || {}, {
    emitOnly: false,
    output: ['src/assets/i18n/[lang].[ext]']
  });

  if (typeof options.emitOnly !== 'boolean') {
    throw new TypeError('emitOnly should be a boolean');
  }

  if (!_.isArray(options.output)) {
    throw new TypeError('output should be an array');
  }

  return options;
}
