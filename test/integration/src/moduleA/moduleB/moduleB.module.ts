import { NgModule } from '@angular/core';
import { ModuleBComponent } from './moduleB.component';
import { ModuleC } from './moduleC/moduleC.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule, ModuleC],
  exports: [ModuleBComponent],
  declarations: [
    ModuleBComponent
  ],
  providers: [],
})
export class ModuleB { }
