const TranslatePlugin  = require('ngx-translation-webpack');
const merge = require('webpack-merge');
module.exports = function (originalConfig, buildOptions) {
  const extractor = new TranslatePlugin.Extractor({
    languages: ['en', 'fr', 'ro'],
    format: 'po',
    relativeOutput: true
  });

  const injector = new TranslatePlugin.Injector({
    format: 'json',         // inject translations as json
    output: []              // no output, only inject into the bundle
  });

  return merge.smart(originalConfig, {
    plugins: [
      extractor.html,       // plug in html extractor
      injector              // plug in translation injector
    ]
  });
};
