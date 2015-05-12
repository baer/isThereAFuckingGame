var path = require('path');
var webpack = require('webpack');
var config = require('./project.config');

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
  devtool: "sourcemap",

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'ENVIRONMENT': JSON.stringify('PROD')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
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
