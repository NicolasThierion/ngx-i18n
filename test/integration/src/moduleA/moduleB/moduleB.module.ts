import { NgModule } from '@angular/core';
import { ModuleBComponent } from './moduleB.component';
import { ModuleC } from './moduleC/moduleC.module';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@ngx-i18n/angular';

@NgModule({
  imports: [I18nModule, ModuleC],
  exports: [ModuleBComponent],
  declarations: [
    ModuleBComponent
  ],
  providers: [],
})
export class ModuleB { }
