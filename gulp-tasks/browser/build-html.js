'use strict';

var path = require('path');
var gulp = require('gulp');
var template = require('gulp-template');
var rename = require('gulp-rename');

var config = require('../../project.config');

gulp.task('build:html', 'Inject HTML with project variables', function () {
  return gulp.src(path.join(config.srcFullPath, 'index.tmpl'))
    .pipe(template({
      googleAnalytics: config.googleAnalytics,
      websiteTitle: config.websiteTitle,
      websiteDescription: config.websiteDescription,
      websiteKeywords: config.websiteKeywords
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(path.join(config.destFullPath)));
});
