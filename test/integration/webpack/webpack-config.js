const GettextExtractPlugin = require('ngx-extract-gettext');
const merge = require('webpack-merge');
module.exports = function (originalConfig, buildOptions) {
  return merge.smart(originalConfig, {
    plugins: [
      new GettextExtractPlugin.extract.Html({
        languages: ['en', 'fr', 'ro'],
        format: 'json',
        relativeOutput: true
      })
    ]
  });
};
