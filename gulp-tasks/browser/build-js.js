'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');

gulp.task('build:js', 'Build minified JS.', function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);

  webpack(webpackConf, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('build:js', err);
    }
    gutil.log('[build:js]', stats.toString({
      colors: true
    }));
    callback();
  });
});
