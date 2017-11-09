const TranslatePlugin  = require('@ngx-i18n/webpack-plugin');
const merge = require('webpack-merge');
module.exports = function (originalConfig, buildOptions) {
  const extractor = new TranslatePlugin.Extractor({
    languages: ['en', 'fr', 'ro'],
    format: 'po',
    relativeOutput: true
  });

  const merger = new TranslatePlugin.Merger({
    format: 'json',         // merge translations as json
    emitOnly: true         // no output, only inject into the bundle
  });

  return merge.smart(originalConfig, {
    plugins: [
      extractor.html,       // plug in html extractor
      merger              // plug in translation merger
    ]
  });
};
