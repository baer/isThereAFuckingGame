"use strict";

const gulp = require("gulp");

const setEnv = function (property, value) {
  process.env[property] = value;
  return value;
};

gulp.task("build:set-development", false, setEnv.bind(null, "NODE_ENV", "development"));
gulp.task("build:set-production", false, setEnv.bind(null, "NODE_ENV", "production"));

gulp.task("build:tasks", false, [
  "javascript",
  "styles",
  "static"
]);

gulp.task("build-development", "build complete app assets with development credientials", [
  "build:set-development"
], () => {
  return gulp.start("build:tasks");
});

gulp.task("build-production", "build complete app assets with production credientials", [
  "build:set-production"
], () => {
  return gulp.start("build:tasks");
});
