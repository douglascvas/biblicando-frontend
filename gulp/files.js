const paths = require('../paths');
const changed = require('gulp-changed');
const gulp = require('gulp');

module.exports = options => () => {
  return gulp.src(paths.input.files.files)
    .pipe(changed(paths.output.dirs.files))
    .pipe(gulp.dest(paths.output.dirs.files));
};
