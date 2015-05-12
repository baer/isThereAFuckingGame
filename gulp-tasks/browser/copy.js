'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../../project.config');

gulp.task('copy', 'Copy all raw files into dist', [
  'copy:root',
  'copy:fonts',
  'copy:images'
]);

gulp.task('copy:root', 'Copy raw files at the root of `src/client` into dist', function () {
  return gulp.src([
    path.join(config.srcFullPath, '.htaccess'),
    path.join(config.srcFullPath, '*'),
    '!' + path.join(config.srcFullPath, 'index.tmpl')
  ]).pipe(gulp.dest(config.destFullPath));
});

gulp.task('copy:fonts', 'Copy fonts into dist', function () {
  return gulp.src([
    './node_modules/font-awesome/fonts/**/*'
  ]).pipe(gulp.dest(path.join(config.destFullPath, 'fonts')));
});

gulp.task('copy:images', 'Copy images into dist', function () {
  return gulp.src([
    './node_modules/bootstrap/img/**/*'
  ]).pipe(gulp.dest(path.join(config.destFullPath, 'img')));
});
