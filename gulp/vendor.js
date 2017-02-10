const gulp = require('gulp');
const browserify = require('browserify');
const browserifyShim = require('browserify-shim');
const paths = require('../paths');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');

module.exports = options => () => {
  return browserify({
    insertGlobals: true,
  })
    .transform(browserifyShim)
    .require(paths.input.files.vendor_js)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('vendor.js'))
    // http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
    // Convert from streaming to buffered vinyl file object for uglify
    .pipe(gulpif(!options.development, buffer()))
    .pipe(gulpif(!options.development, uglify()))
    .pipe(gulp.dest(paths.output.dirs.scripts));
};
