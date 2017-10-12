import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app2-root',
  templateUrl: './app2.component.html',
  styleUrls: ['./app.component.css']
})


export class App2Component {
  title = 'app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
