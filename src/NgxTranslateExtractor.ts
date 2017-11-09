import {
  DirectiveParser, ExtractTaskOptionsInterface,
  ParserInterface, PipeParser,
  ServiceParser
} from './biesbjerg-ngx-translate-extract'
import * as _ from 'lodash';
import * as PATH from 'path';
import { normalizePath, readDir, save } from './utils';
import * as fs from 'fs';
import { I18nParser } from './parsers/I18nParser';
import { CompilerInterface } from '@biesbjerg/ngx-translate-extract';
import { CompilerFactory } from './compiler.factory';
import { ExtendedTranslationCollection } from './ExtendedTranslationCollection ';

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

    this._parsers = [
      new PipeParser(),
      new DirectiveParser(),
      new ServiceParser(),
      new I18nParser()
    ];

    this._compiler = CompilerFactory.create(this.options.format, {})
  }

  public execute(filenames?: string[]) {

    const o = this.options as any;
    const input = filenames ? filenames
        .map(f => fs.statSync(f).isFile() ? PATH.dirname(f) : f)
      : o.input;

    // if output specified, run ExtractTask as normal
    if (!this.options.relativeOutput) {
      // ngx-translate-extract --input  `input` --output `output` --clean --sort --format namespaced-json
      let collections = this._extract(input, o);
      this._save(collections, o.output.map(ot => PATH.join(ot, `[lang].[ext]`)));
    } else {

      // list all files found that matches template
      const dirs = new Set<string>();
      input.map(dir => {
        return readDir(dir, o.patterns)
          .map(PATH.dirname)
          .reduce((dirs: Set<string>, dir: string) => {
            return dirs.add(dir);
          }, dirs);
      });

      // run one extractTask per folder where template is found
      dirs.forEach(dir => {
        let collections = this._extract([dir], {
          patterns: o.patterns.map(p => `/${PATH.basename(p)}`)
        });
       this._save(collections, o.output.map(ot => PATH.join(dir, ot, `${PATH.basename(dir)}.[lang].[ext]`)));
      });
    }
  }

  /**
   * Extract strings from input dirs using configured parsers
   */
  protected _extract(input: string[], options: ExtractTaskOptionsInterface): {[lang:string]: ExtendedTranslationCollection} {
    let collection = new ExtendedTranslationCollection();
    input.forEach(dir => {
      readDir(dir, options.patterns || []).forEach(path => {
        const contents: string = fs.readFileSync(path, 'utf-8');
        this._parsers.forEach((parser: ParserInterface) => {
          collection = collection.union(parser.extract(contents, path));
        });
      });
    });

    const collections = {};
    (this.options as any).languages.forEach(l => {
      collections[l] = collection;
    });

    return collections;
  }

  private _save(collections: {[lang: string]: ExtendedTranslationCollection}, outputs: string[]): any {

    for (const lang of Object.keys(collections)) {

      const normalizedOutputs = outputs.map(ot => normalizePath(ot, this._compiler.extension, lang));
      normalizedOutputs.forEach(o => {
        const collection = intersect(o, this._compiler, collections[lang]);
        save(collection, lang, (this.options as any).format, o);
      })
    }
  }
}

function intersect(path: string, compiler: CompilerInterface,
                   collection = new ExtendedTranslationCollection()): ExtendedTranslationCollection {
  let res = collection;

  if (PATH.extname(path) !== `.${compiler.extension}`) {
    return res;
  }
  if (!fs.existsSync(path)) {
    return res;
  }
  res = ExtendedTranslationCollection.of(compiler.parse(fs.readFileSync(path, 'utf-8')));
  res = collection.union(res).intersect(collection);
  return res;
}
