import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  TranslateModule, TranslateLoader, MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { Http } from '@angular/http';
import { ModuleB } from './moduleB/moduleB.module';
import { ModuleAComponent } from './moduleA.component';


export class MissingTranslationLogger {
  handle(params: MissingTranslationHandlerParams): any {
    console.error(`Missing translation for ${params.key}`);
  }
}

@NgModule({
  declarations: [
    ModuleAComponent
  ],
  imports: [
    BrowserModule, ModuleB,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationLogger},

    })
  ],
  providers: [],
  bootstrap: [ModuleAComponent]
})
export class ModuleA { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/');
}

export function PoLoaderFactory(http: Http) {
  return new TranslatePoHttpLoader(http, '/assets/i18n', '.po');
}
