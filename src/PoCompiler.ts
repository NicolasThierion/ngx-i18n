import { PoCompiler as NgxPoCompiler } from './biesbjerg-ngx-translate-extract';
import { ExtendedTranslationCollection } from './ExtendedTranslationCollection ';
import { TranslationMeta } from './TranslationMeta';
import * as gettext from 'gettext-parser';
import * as _ from 'lodash';

/**
 * Extends original PoCompiler to add metadata
 */
export class PoCompiler extends NgxPoCompiler {
  constructor(options) {
    super(options)
  }

  compile(collection: ExtendedTranslationCollection): string {
    collection.meta = collection.meta || _.noop;

    const data = {
      charset: 'utf-8',
      headers: {
        'mime-version': '1.0',
        'content-type': 'text/plain; charset=utf-8',
        'content-transfer-encoding': '8bit'
      },
      translations: {
        [this.domain]: Object.keys(collection.values)
          .reduce((translations, key) => {
          const meta = collection.meta[key] || {} as TranslationMeta;
          translations[key] = {
            msgid: key,
            msgstr: collection.get(key),
            msgctxt: meta.meaning,
            comments: {
              reference: meta.location,
              extracted: meta.description
            }
          };
          return translations;
        }, <any> {})
      }
    };

    return gettext.po.compile(data);
  }

  public parse(contents: string): ExtendedTranslationCollection {
    const collection = new ExtendedTranslationCollection ();
    const domain = this.domain;
    const po = gettext.po.parse(contents, 'utf-8');

    const translations = Object.keys(po.translations)
      .reduce((translations, domain) => {
        return Object.assign(translations, po.translations[domain]);
      }, {});

    if (!Object.keys(translations).length) {
      return collection;
    }

    const values = {};
    const meta: {[key: string]: TranslationMeta} = {};
    Object.keys(translations)
      .filter(key => key.length > 0)
      .forEach((key) => {
        values[key] = translations[key].msgstr.pop();
        meta[key] = {
          location: translations[key].reference,
          meaning: translations[key].msgctxt,
          description: translations[key].extracted
        };
      }, {});

    return new ExtendedTranslationCollection(values, meta);
  }

}
