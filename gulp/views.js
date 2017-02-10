const paths = require('../paths');
const changed = require('gulp-changed');
const gulp = require('gulp');

module.exports = options => () => {
  return gulp.src(paths.input.files.views)
    .pipe(changed(paths.output.dirs.views))
    .pipe(gulp.dest(paths.output.dirs.views));
};
