const paths = require('../paths');
const changed = require('gulp-changed');
const gulp = require('gulp');

module.exports = options => () => {
  return gulp.src(paths.input.files.html)
    .pipe(changed(paths.output.dirs.htmlTemplates))
    .pipe(gulp.dest(paths.output.dirs.htmlTemplates));
};
