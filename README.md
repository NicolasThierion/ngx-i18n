# @ngx-i18n/webpack-plugin <sub>0.0.3</sub>

## Disclaimer 
> This is my first webpack plugin. This project is a work in progress. It as not been heavily tested. 
It was made to fit my particular needs to have dynamic translation with multiple .po files for an Angular 4 project.
It may break on any other setup that differs from mine, and I will likely stop to maintain it as soon as I'm happy with it.
Anyway, feel free to use it or to contribute. 

## What is it?
This project is a webpack plugin to extract translations from html templates.
It uses [biesbjerg/ngx-translate-extract](https://github.com/biesbjerg/ngx-translate-extract) 
under the hood to parse templates, extract translations, and save them in JSON or PO format.
Translations can then be edited before being injected back into the webpack bundle.

## Why do we need another plugin to do that ?
[biesbjerg/ngx-translate-extract](https://github.com/biesbjerg/ngx-translate-extract) already make it possible to extract
translations, and save it in JSON or GetText format, by matching recognized [ngx-translate](https://github.com/ngx-translate) usage.
In addition, I needed to have the following : 
 - Save small translation files along with the templates they have been extracted from, instead of having one big global translation file per language
   (thus, keeping my modules independent from each other)
 - Use Gettext format, and make use of its additional "context-aware" capabilities over JSON.
   This plugin generate `#: src`, `#. description`, and `msgctxt` annotations when saving to .PO format.
 - Use a syntax that come closer to the official [xi18n](https://github.com/angular/angular-cli/wiki/xi18n) syntax, rather than the ngx-translate directive.
 - Extract default translations from templates.

Long story short, here is what we get :

Given `src/module-a.html` 
```html
  <div>
      <!-- 'classic' ngx-translate usage. No context, no default translation extraction -->
      <h1 translate>ngx-translate directive</h1>
      <div>{{ 'ngx-translate pipe' | translate }}</div>
      
      <!-- 'ngx-i18n', with context, annotation, default translation... -->
      <div ngx-i18n="context|description@@a.i18n.key">Default translation</div>
      
      <!-- arguments are optional. If id not set, id will be default translation -->
      <div ngx-i18n tr>Default translation with no id</div>
      
      <!-- you can use interpolation -->
      <div ngx-i18n [translateParams]="{value: 'World'}">hello %value</div>
  </div>
```

Output: `src/i18n/[lang].po`
```po
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"

msgid "ngx-translate directive"
msgstr ""

msgid "Module A pipe"
msgstr ""

#: path/to/src/module-a.html
#. description
msgctxt "context"
msgid "a.i18n.key"
msgstr "Module A i18n"

#: path/to/src/module-a.html
msgid "Default translation with no id"
msgstr "Default translation with no id"

#: path/to/src/module-a.html
#. description
msgctxt "context"
msgid "a.i18n.key-with-parameters"
msgstr "hello ngx {{value}}"
```

## How to use the plugin
1. Install the plugin
    ```sh
    npm install https://git@github.com/NicolasThierion/ngx-i18n-webpack-plugin.git#0.0.3
    ```
2. Enable the plugin into your webpack config
webpack.config.js: 
    ```js
      const TranslatePlugin  = require('@ngx-i18n/webpack-plugin');
            
      const extractor = new TranslatePlugin.Extractor({
        languages: ['en', 'fr', 'ro'],
        format: 'po',           // Generate translation files in '.po' format
        relativeOutput: true    // Generate multiple files per modules (each folder contains its own 'i18n/xx.po' files) 
      });
      
      const merger = new TranslatePlugin.Merger({
        format: 'json',         // merge previously generated files to a single json
        emitOnly: true,         // do not write on disk, only inject into the webpack bundle
        output: ['src/assets/i18n/[lang].[ext]']   // output / emit to default path, which actually is default value. 
      });
      
      // ...
          plugins: [
            extractor.html,       // plug in html extractor
              merger              // plug in translation merger
          ]
      // ...
    };
    ```
The plugin comes with a bunch of processors 
- Extractors: 
  - `extractor.html` : Extracts translation keys from html templates, and merge them to existing translation files.
  - `extractor.ts` : (TODO) Extracts translation keys from typescript templates, and merge them to existing translation files.
- `merger`: Merge all found translation (in case of extractor.relativeOutput=true), and emit a single file per language to be injected in your app.

> Angular CLI users
Angular cli does not allow webpack config customization, but you may find 2 workaround for it : 
 - [ng eject](https://github.com/angular/angular-cli/wiki/eject) your project
 - customize the internal webpack config with [@splice/angular-cli-wrapper ](https://www.npmjs.com/package/@splice/angular-cli-wrapper)

## How to use the directive
1. Install the `ngx-i18n` directive
    ```sh
    npm install https://git@github.com/NicolasThierion/ngx-i18n-angular.git#0.0.3
    ```
    
2. Register the module at your root module

`app.module.ts`
```ts
@NgModule({
  declarations: [
    ModuleAComponent
  ],
  imports: [
    I18nModule.forRoot('src/assets/i18n/')    // register I18n module, with pre-configures http json loader binded to this path
  ],
  bootstrap: [ModuleAComponent]
})
export class AppModule { }
```

3. Register the module to each lazy loaded chile module that needs to use the directive

```ts
@NgModule({
  declarations: [
    ModuleAComponent
  ],
  imports: [
    I18nModule
  ],
  bootstrap: [ModuleAComponent]
})
export class AppModule { }
```


## How to contribute 
The project comes with its build toolchain based on gulp.
 - run `gulp build` to build the project to the `dist/` directory.
 - run `gulp watch` to watch & build the project.
 - run 'sudo npm link' to link the library to your project 
 - cd `test/integration && ng serve` to krank up a simple application that make use of the plugin.

### TODO 
- plug in ngx js/ts parser (extractor.ts)
- proper unit tests & integration tests.
- 
 
### CHANGELOG:
 -  0.0.3 
    - `emitOnly` parameter make it possible to write merged files to disk (rather than just emmit).
