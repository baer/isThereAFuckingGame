"use strict";

const eslint = require("gulp-eslint");
const gulp = require("gulp");
const path = require("path");

const config = require("../../../project.config");
const handleErrors = require("../util/handle-errors");

gulp.task("lint:all", false, () => {
  return gulp.src([
    path.join(config.srcFullPath, "**/*.js"),
    path.join(config.root, "*.js"),
    path.join(config.root, "gulp-tasks/**/*.js")
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("lint", "run lint tasks", [
  "lint:all"
]);
