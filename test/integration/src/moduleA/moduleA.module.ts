import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleB } from './moduleB/moduleB.module';
import { ModuleAComponent } from './moduleA.component';
import { I18nModule } from '@ngx-i18n/angular';



@NgModule({
  declarations: [
    ModuleAComponent
  ],
  imports: [
    BrowserModule, /* ModuleB, */
    HttpClientModule,
    I18nModule.forRoot('src/assets/i18n/')
  ],
  providers: [],
  bootstrap: [ModuleAComponent]
})
export class ModuleA { }


