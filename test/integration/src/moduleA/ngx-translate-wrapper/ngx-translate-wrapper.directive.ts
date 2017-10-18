import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const DIRECTIVE_NAME = 'ngx-i18n';
const EXPRESSION_REGEX = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
@Directive({ selector: `[ngx-i18n]` })
export class I18nDirective implements OnChanges {

  @Input() 'ngx-i18n': string;

  constructor(private _el: ElementRef, private _translate: TranslateService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (EXPRESSION_REGEX.test(this[DIRECTIVE_NAME])) {
      const match = this[DIRECTIVE_NAME].match(EXPRESSION_REGEX);
      let key = match[3];
      // if key not found
      if (typeof key === 'undefined') {
        // consider the default text to be the key
        key = this._el.nativeElement.innerText;
      }

      this._translate.get(key).subscribe(translation => {
        this._el.nativeElement.innerText = translation
      });
    }
  }

}
