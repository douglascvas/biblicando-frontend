const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const paths = require('../paths');

module.exports = options => () => {
  options = options || {};
  return gulp.src([paths.input.files.scripts, "!" + paths.input.files.scriptsMin], {base: "."})
    .pipe(concat(paths.output.files.scripts))
    .pipe(gulpif(!options.development, uglify()))
    .pipe(gulp.dest("."));
};
