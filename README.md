# Webpack gettext plugin

This project is a webpack plugin to extract translations from html templates.
It uses [biesbjerg/ngx-translate-extract](https://github.com/biesbjerg/ngx-translate-extract) to parse templates and extract translations.

## How to use
 

1. Install the plugin
    ```sh
    npm install git+https://git@github.com/nicolasThierion/webpack-gettext-plugin.git
    ```
2. Plug it into your webpack config
webpack.config.js: 
    ```js
    const GettextExtractPlugin = require('ngx-extract-gettext');
      // ...
        plugins: [
          new GettextExtractPlugin.extract.Html({
            languages: ['en', 'fr', 'ro'],
            format: 'json',
            relativeOutput: true
          })
        ]
        
      // ...
    };
    ```
