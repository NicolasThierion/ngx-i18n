# Webpack gettext plugin <sub>0.0.3</sub>

This project is a webpack plugin to extract translations from html templates.
It uses [biesbjerg/ngx-translate-extract](https://github.com/biesbjerg/ngx-translate-extract) to parse templates and extract translations
out of them. Translations can then be edited before being injected back into the webpack bundle.

## Disclaimer 
This is my first webpack plugin. This project is a work in progress. It as not been heavily tested. 
It was made to fit my particular needs to have dynamic translation with multiple .po files for an Angular 4 project.
It may break on any other setup that differs from mine, and I will likely stop to maintain it as soon as I'm happy with it.
Anyway, feel free to use it or to contribute. 

## How to use
1. Install the plugin
    ```sh
    npm install https://git@github.com/NicolasThierion/webpack-gettext-plugin.git#0.0.1
    ```
2. Enable the plugin into your webpack config
webpack.config.js: 
    ```js
      const TranslatePlugin  = require('ngx-translation-webpack');
            
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

## Angular CLI users
Angular cli does not allow webpack config customization, but you may find 2 workaround for it : 
 - [ng eject](https://github.com/angular/angular-cli/wiki/eject) your project
 - customize the internal webpack config with [@splice/angular-cli-wrapper ](https://www.npmjs.com/package/@splice/angular-cli-wrapper)

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
