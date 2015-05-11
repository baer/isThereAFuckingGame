'use strict';

var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');

var config = require('../../project.config');

gulp.task('build:css', 'Build CSS & LESS --> CSS.', [
  'build:css:css',
  'build:css:less'
]);

gulp.task('build:css:css', 'Build and add vendor prefixes for plain CSS.', function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, '*.css'))
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(gulp.dest(path.join(config.destFullPath, 'styles')));
});

gulp.task('build:css:less', 'Build and add vendor prefixes to LESS styles.', function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, '*.less'))
    .pipe(less())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(gulp.dest(path.join(config.destFullPath, 'styles')));
});
