import { ParserInterface } from '../biesbjerg-ngx-translate-extract';
import { } from '@biesbjerg/ngx-translate-extract';
import { AbstractTemplateParser } from './abstract-template.parser';

import * as $ from 'cheerio';
import { ExtendedTranslationCollection } from '../ExtendedTranslationCollection ';
import { TranslationMeta } from '../TranslationMeta';

export class I18nParser extends AbstractTemplateParser implements ParserInterface {

  public extract(contents: string, path?: string): ExtendedTranslationCollection {
    if (path && this._isAngularComponent(path)) {
      contents = this._extractInlineTemplate(contents);
    }

    return this._parseTemplate(contents, path);
  }

  protected _parseTemplate(template: string, path?: string): ExtendedTranslationCollection {
    let collection = new ExtendedTranslationCollection();

    template = this._normalizeTemplateAttributes(template);

    const selector = '[ngx-i18n]';
    $(template)
      .find(selector)
      .addBack(selector)
      .each((i: number, element: CheerioElement) => {
        const $element = $(element);
        let attr = $element.attr('ngx-i18n') || '';
        const pattern = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
        let meta: TranslationMeta = {};
        let meaning, description, id;
        if (pattern.test(attr)) {
          const matches = (attr.match(pattern) as RegExpMatchArray);
          [meaning, description, id] = matches.slice(1);
          meta = {
            meaning, description
          }
        }
        meta.location = path;

        $element
          .contents()
          .toArray()
          .filter(node => node.type === 'text')
          .map(node => node.nodeValue.trim())
          .filter(text => text.length > 0)
          .map(text => text.replace(/%([^\s]*)/g, "{{$1}}"))    // replaces '%value' with '{{value}}'
          .forEach(text => collection = collection.add(typeof id === 'undefined' ? text: id, text, meta));
      });

    return collection;
  }

  /**
   * Angular's `[attr]="'val'"` syntax is not valid HTML,
   * so it can't be parsed by standard HTML parsers.
   * This method replaces `[attr]="'val'""` with `attr="val"`
   */
  protected _normalizeTemplateAttributes(template: string): string {
    return template.replace(/\[([^\]]+)\]="'([^']*)'"/g, '$1="$2"');
  }
}
