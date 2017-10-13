import {
  CompilerInterface,
  DirectiveParser,
  ExtractTask, ExtractTaskOptionsInterface,
  ParserInterface, PipeParser,
  ServiceParser
} from './ngx-import'
import * as _ from 'lodash';
import * as path from 'path';
import { readDir } from './utils';
import { CompilerFactory } from './compiler.factory';

export interface NgxOptions extends ExtractTaskOptionsInterface {
  input?: string[];
  output?: string[];
  relativeOutput?: boolean;
  format?: 'po' | 'json',
  languages?: ['en']
}

/**
 * Wrapper for ExtractTask without going through the provided cli.
 */
export class NgxTranslateExtractor {
  _parsers: ParserInterface[];
  _compiler: CompilerInterface;
  options: NgxOptions;

  constructor(options: NgxOptions = {}) {
    this.options = _.defaults(options, {
      clean: true,                 // Remove obsolete strings when merging
      replace: false,              // Replace the contents of output file if it exists
      sort: false,                 // Sort strings in alphabetical order when saving
      patterns: ['/**/*.html', '/**/*.ts'],    // Extract strings from the following file patterns
      input: ['./src'],
      output: ['./i18n'],
      relative: true,
      languages: ['en'],
      format: 'po'                // gettext format
    });
    Object.seal(this.options);

    if (this.options.format !== 'po' && this.options.format !== 'json') {
      throw new TypeError(`invalid format : ${options.format}. Valid format are json, po`);
    }

    this._compiler = CompilerFactory.create(this.options.format, {});

    this._parsers = [
      new PipeParser(),
      new DirectiveParser(),
      new ServiceParser()
    ];
  }

  public execute(filenames?: string[]) {

    const o = this.options as any;
    const input = filenames || o.input;

    // if output specified, run ExtractTask as normal
    if (!this.options.relativeOutput) {
      // ngx-translate-extract --input  `input` --output `output` --clean --sort --format namespaced-json
      let outputs: string[] = [];
      for (const lang of o.languages) {
        for (const ot of o.output) {
          outputs.push(path.join(ot, `${lang}.${o.format}`));
        }
      }
      const extract = new ExtractTask(input, outputs, o);
      extract.setCompiler(this._compiler);
      extract.setParsers(this._parsers);
      extract.execute();
    } else {

      // list all files found that matches template
      const dirs = new Set<string>();
      input.map(dir => {
        return readDir(dir, o.patterns)
          .map(path.dirname)
          .reduce((dirs: Set<string>, dir: string) => {
            return dirs.add(dir);
          }, dirs);
      });

      // run one extractTask per folder where template is found
      dirs.forEach(dir => {
        let outputs = [];
        for (const lang of o.languages) {
          outputs = outputs.concat(
            o.output
              .map(ot => path.join(dir, ot, `${path.basename(dir)}.${lang}.${o.format}`)))
        }

        const extract = new ExtractTask([dir], outputs, {
          patterns: o.patterns.map(p => `/${path.basename(p)}`)
        });
        extract.setCompiler(this._compiler);
        extract.setParsers(this._parsers);
        extract.execute();
      });
    }
  }
}
