const gulp = require('gulp');
const paths = require('../paths');

module.exports = options => () => {
  return gulp.src('./package.json')
    .pipe(gulp.dest(paths.output.dirs.js));
};
