'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../project.config');

gulp.task('default', false, function () {
  gulp.tasks.help.fn();
});

gulp.task('build', 'Clean then Copy assets and build CSS+JS', ['clean'], function () {
  gulp.run('copy');
  gulp.run('build:html');
  gulp.run('build:css');
  gulp.run('build:js');
});
