const sass = require('gulp-sass');
const gulp = require('gulp');
const paths = require('../paths');

module.exports = function sassTask() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.outputCss));
};