"use strict";

const del = require("del");
const gulp = require("gulp");
const replace = require("gulp-replace");

const getBundleName = require("../util/get-bundle-name.js");
const handleErrors = require("../util/handle-errors");

const getGoogleAnalyticsId = () => {
  return "UA-32746833-1" || "UA-xxxxxxxx-x";
};

gulp.task("static:clean-root", false, () => {
  return del(["dist-dev/*"], { nodir: true });
});

gulp.task("static:clean-fonts", false, () => {
  return del(["dist-dev/fonts"]);
});

gulp.task("static:html", false, ["static:clean-root"], () => {
  return gulp.src([
    "./src/client/index.html",
    "./src/client/404.html"
  ])
    .pipe(replace("@@cssBundle", getBundleName({ ext: "css" })))
    .pipe(replace("@@googleAnalyticsId", getGoogleAnalyticsId()))
    .pipe(gulp.dest("dist-dev"))
    .on("error", handleErrors);
});

gulp.task("static:fonts", false, ["static:clean-fonts"], () => {
  return gulp.src([
    "./node_modules/font-awesome/fonts/**/*",
    "./node_modules/bootstrap/fonts/**/*"
  ])
    .pipe(gulp.dest("dist-dev/fonts"))
    .on("error", handleErrors);
});

gulp.task("static:web-root", false, ["static:clean-root"], () => {
  return gulp.src([
    "./src/client/.htaccess",
    "./src/client/browserconfig.xml",
    "./src/client/crossdomain.xml",
    "./src/client/favicon.ico",
    "./src/client/robots.txt"
  ])
    .pipe(gulp.dest("dist-dev"))
    .on("error", handleErrors);
});

gulp.task("static", "process static assets (fonts, favicon.ico, etc.)", [
  "static:html", "static:fonts", "static:web-root"
]);
