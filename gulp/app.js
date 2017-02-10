const gulp = require('gulp');
const browserify = require('browserify');
const browserifyShim = require('browserify-shim');
const paths = require('../paths');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');

module.exports = options => (cb) => {
  if(options.development){
    return cb();
  }
  return browserify({
    insertGlobals: true,
    entries: [paths.input.files.app]
  })
    .transform(browserifyShim)
    .external(paths.input.files.vendor_js)
    // .add(build.input.files.polyfill_js)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app.js'))
    // http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
    // Convert from streaming to buffered vinyl file object for uglify
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.output.dirs.scripts));
};
