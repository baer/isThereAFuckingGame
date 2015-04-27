'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../../project.config');

gulp.task('copy', 'Copy all raw files into dist', [
  'copy:root',
  'copy:data',
  'copy:fonts',
  'copy:images'
]);

gulp.task('copy:root', function () {
  return gulp.src([
    path.join(config.srcFullPath, '.htaccess'),
    path.join(config.srcFullPath, '*')
  ]).pipe(gulp.dest(config.destFullPath));
});

gulp.task('copy:data', function () {
  return gulp.src([
    path.join(config.srcFullPath, '../data/**/*')
  ]).pipe(gulp.dest(path.join(config.destFullPath, 'data')));
});

gulp.task('copy:fonts', function () {
  return gulp.src([
    './node_modules/font-awesome/fonts/**/*'
  ]).pipe(gulp.dest(path.join(config.destFullPath, 'fonts')));
});

gulp.task('copy:images', function () {
  return gulp.src([
    './node_modules/bootstrap/img/**/*'
  ]).pipe(gulp.dest(path.join(config.destFullPath, 'img')));
});
