const ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;
const DefinePlugin = require("webpack").DefinePlugin;
const optimize = require("webpack").optimize;
const path = require('path');
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;
const webpack = require('webpack');

var config = require('../../project.config');

module.exports = {
  context: config.srcFullPath,

  entry: {
    main: './js/main.js'
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },

  module: {
    loaders: [{
      name: "babel",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: require.resolve("babel-loader")
    }, {
      name: "json",
      test: /\.json$/,
      loader: require.resolve("json-loader")
    }]
  },

  plugins: [
    new SourceMapDevToolPlugin({
      test: /\.(css|js)($|\?)/,
      filename: "[file].map",
      append: `\n//# sourceMappingURL=[url]`,
      module: true,
      columns: true
    }),
    new DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new optimize.DedupePlugin(),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // Moment by default includes all locales - this ensures that only english is loaded.
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],

  /**
   * This defines the 'root' of your project.  If you `require('some-package')`
   * from within your application JS, Webpack will first check the directory
   * specified in config.root for `some-package.js` before checking node_modules.
   */

  resolve: {
    root: config.root
  }
};
