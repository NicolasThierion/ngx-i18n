import { NgModule } from '@angular/core';
import { ModuleCComponent } from './moduleC.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModuleCComponent
  ],
  imports: [TranslateModule],
  exports: [ModuleCComponent]
})
export class ModuleC { }
