'use strict';

var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');

var config = require('../../project.config');

gulp.task('build:css', 'Build LESS --> CSS.', [
  'build:css:less'
]);

gulp.task('build:css:less', 'Build and add vendor prefixes to LESS styles.', function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, '*.less'))
    .pipe(less())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
    .pipe(gulp.dest(path.join(config.destFullPath, 'styles')));
});
