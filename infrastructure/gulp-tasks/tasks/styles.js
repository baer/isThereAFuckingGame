"use strict";

const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");

const getBundleName = require("../util/get-css-bundle-name.js");
const handleErrors = require("../util/handle-errors");

gulp.task("styles:clean", false, () => {
  return del(["dist-dev/css"]);
});

gulp.task("styles:compile", false, ["styles:clean"], () => {
  return gulp.src("./src/client/styles/main.less")
    .pipe(less())
    .pipe(rename(getBundleName({ ext: "css" })))
    .pipe(postcss([ cssnano ]))
    .pipe(gulp.dest("dist-dev/css/"))
    .on("error", handleErrors);
});

gulp.task("styles", "process styles", ["styles:compile"]);
