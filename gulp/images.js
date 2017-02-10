const paths = require('../paths');
const changed = require('gulp-changed');
const gulp = require('gulp');

module.exports = options => () => {
  return gulp.src(paths.input.files.images)
    .pipe(changed(paths.output.dirs.images))
    .pipe(gulp.dest(paths.output.dirs.images));
};
