import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'module-a',
  templateUrl: './moduleA.component.html'
})
export class ModuleAComponent {
  value: any;

  constructor(private _translate: TranslateService) {

    this.value = this._translate.instant('some.translation.from.ts')
  }
}
