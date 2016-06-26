const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const paths = require('../paths');

function reload() {
  browserSync.reload();
  return Promise.resolve(true);
}

module.exports = function (gulp, options) {
  options = options || {port: 3000};
  return function () {
    console.log('### Watching changes on port', options.port);
    browserSync({
      proxy: `http://localhost:${options.port}`,
      open: false
    });
    gulp.watch([`${paths.output}/config.js`], gulp.series('fe-build:main', reload));
    gulp.watch([`${paths.baseMain}/**/*.*`], gulp.series('fe-build:main', reload));
    gulp.watch([`${paths.baseSass}/**/*.*`], gulp.series('fe-sass', reload));
    gulp.watch([`${paths.baseImg}/**/*.*`], gulp.series('fe-copy:img', reload));
    gulp.watch([`${paths.baseFont}/**/*.*`], gulp.series('fe-copy:font', reload));
    gulp.watch([`${paths.baseTest}/**/*.*`], gulp.series('fe-build:test'));
  };
};