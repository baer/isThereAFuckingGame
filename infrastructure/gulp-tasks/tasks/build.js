"use strict";

const gulp = require("gulp");

gulp.task("build", "build complete app assets with production credientials", [
  "javascript",
  "styles",
  "static"
]);
