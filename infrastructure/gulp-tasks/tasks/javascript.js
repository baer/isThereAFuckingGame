"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const del = require("del");

const webpackConfig = require("../../webpack/webpack.config");

gulp.task("js:clean", false, () => {
  return del(["dist-dev/js"]);
});

gulp.task("js:client", false, ["js:clean"], (cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("js:client", err);
    }

    gutil.log("[build:js]", stats.toString({ colors: true }));
    cb();
  });
});

gulp.task("javascript", "process JavaScript", ["js:client"]);
