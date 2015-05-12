'use strict';

var path = require('path');
var gulp = require('gulp');
var _ = require('lodash');
var gutil = require('gulp-util');
var map = require('map-stream');
var eslint = require('gulp-eslint');
var config = require('../project.config');

gulp.task('lint', 'Lint application', function (cb) {
  var success = true;

  gulp.src([
    path.join(config.srcFullPath, '**/*.js'),
    path.join(config.root, '*.js'),
    path.join(config.root, 'gulp-tasks/**/*.js')
  ])
    .pipe(eslint())
    .pipe(map(function (file, output) {
      success = success && _.every(file.eslint && file.eslint.messages, function (message) {
        return message.severity !== 2;
      });
      return output(null, file);
    }))
    .pipe(eslint.format())
    .on('end', function () {
      if (success) {
        gutil.log('[lint]', 'SUCCESS!');
        cb();
      } else {
        cb(new gutil.PluginError('lint', '*** FAILED ESLINT ***'));
      }
    });
});
