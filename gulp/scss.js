const sass = require('gulp-sass');
const gulp = require('gulp');
const paths = require('../paths');
const gulpif = require('gulp-if');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

module.exports = options => () => {
  options = options || {};
  return gulp.src(paths.input.files.scss)
    .pipe(sass()).on('error', function (err) {
      sass.logError(err);
      this.emit('end'); // emit the end event, to properly end the task.
    })
    .pipe(gulpif(!options.development, cssmin()))
    .pipe(concat(`app.${options.version}.css`))
    .pipe(gulp.dest(paths.output.dirs.styles))
    .pipe(gulpif(options.development, browserSync.stream()));
};
