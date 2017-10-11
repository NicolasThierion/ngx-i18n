import { Log } from './log';
import { Compiler } from 'webpack';
import { NgxPoExtractor } from './NgxPoExtractor';
import * as _ from 'lodash';

export interface GettextExtractPluginOptions {
  input?: string[];
  output?: string[];
  relativeOutput?: boolean;
  languages?: string[];
}

export namespace GettextExtractPlugin {
  export namespace extract {
    export class Html {
      private _extractor: NgxPoExtractor;

      constructor(options: GettextExtractPluginOptions = {}) {
        const patterns = ['/**/*.html'];
        this._extractor = new NgxPoExtractor(_.merge(options, {
          patterns
        }));
        Log.debug(`extraction of translations from ${patterns}`);
      }

      apply(compiler: Compiler) {
        compiler.plugin('compile', compilation => {
          this._extractor.execute();
        });
      }
    }

    export class Js {
      constructor(options: GettextExtractPluginOptions = {}) {
        throw new Error('not implemented')
      }

      apply(compiler: Compiler) {
        // TODO extract translations from JS.
        throw new Error('not implemented')
      }
    }
  }
}

