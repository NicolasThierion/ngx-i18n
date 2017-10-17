import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'module-b',
  templateUrl: './moduleB.component.html'
})
export class ModuleBComponent {
  constructor(private translate: TranslateService) {
  }
}
