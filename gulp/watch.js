const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const watch = require('gulp-watch');
const paths = require('../paths');
const pkg = require('../package.json');
const gulp = require('gulp');

function reload() {
  browserSync.reload();
  return Promise.resolve(true);
}

function recompile(file) {
  compile(file.history, paths.outputMain, {base: `${paths.baseMain}/`});
  browserSync.reload();
}

let typescriptTask = require('./typescript');
let scriptsTask = require('./scripts');
let filesTask = require('./files');
let htmlTask = require('./html');
let scssTask = require('./scss');

module.exports = options => () => {
  console.log('### Watching changes on port', options.port);
  browserSync({
    proxy: `http://localhost:${options.port}`,
    open: false
  });
  watch(paths.input.files.html, gulp.series(htmlTask(options), reload));
  watch(paths.input.files.ts, gulp.series(typescriptTask(options)));
  watch(paths.input.files.scripts, gulp.series(scriptsTask(options)));
  watch(paths.input.files.files, gulp.series(filesTask(options), reload));
  watch(paths.input.files.scss, gulp.series(scssTask(options)));
};
