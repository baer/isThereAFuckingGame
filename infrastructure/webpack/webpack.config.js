const DefinePlugin = require("webpack").DefinePlugin;
const path = require('path');
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

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
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
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
    new BabiliPlugin({}, {
      sourceMap: true
    })
  ],

  /**
   * This defines the 'root' of your project.  If you `require('some-package')`
   * from within your application JS, Webpack will first check the directory
   * specified in config.root for `some-package.js` before checking node_modules.
   */

  resolve: {
    modules: [
      path.join(config.root, config.src),
      "node_modules"
    ]
  }
};
