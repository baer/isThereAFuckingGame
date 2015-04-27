'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var config = require('../../project.config');

gulp.task('clean', false, function (cb) {
  del([path.join(config.dest, '/**/*'), path.join(config.dest, '/\.*')], cb);
});
