'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var gutil = require('gulp-util');
var webpack = require('webpack');
var del = require("del");

var webpackConfig = require('../../webpack.config');

gulp.task("js:clean", false, () => {
  return del(["dist-dev/js"]);
});

gulp.task("js:client", false, ["js:clean"], (cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("js:client", err);
    }

    gutil.log("[build:js]", stats.toString({colors: true}));
    cb();
  });
});

gulp.task("javascript", "process JavaScript", ["js:client"]);
