const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const reload = browserSync.reload;

module.exports = function (gulp) {
  return {
    serve: function (prefix) {
      return function () {
        browserSync({
          proxy: "localhost:3000",
          port: 3001,
          open: false
        });
        gulp.watch(['config.js'], [prefix + 'build:main', reload]);
        gulp.watch(['src/main/**/*'], [prefix + 'build:main', reload]);
        gulp.watch(['src/resource/**/*'], [prefix + 'build:resource', reload]);
        gulp.watch(['src/test/**/*'], [prefix + 'build:test']);
      }
    }
  };
};