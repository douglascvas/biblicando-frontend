const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const reload = browserSync.reload;
const paths = require('../paths');

module.exports = function (gulp) {
  return {
    watch: function (prefix) {
      return function () {
        console.log('### Watching changes.');
        browserSync({
          proxy: "http://localhost:3000",
          open: false
        });
        gulp.watch([`${paths.output}/config.js`], [prefix + 'build:main', reload]);
        gulp.watch([`${paths.baseMain}/**/*`], [prefix + 'build:main', reload]);
        gulp.watch([`${paths.baseResource}/**/*`], [prefix + 'build:resource', reload]);
        gulp.watch([`${paths.baseTest}/**/*`], [prefix + 'build:test']);
      }
    }
  };
};