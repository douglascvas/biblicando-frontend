const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = function (gulp) {
  return {
    serve: function (prefix) {
      return function () {
        browserSync({
          proxy: "http://localhost:3000",
          open: false
          // server: {
          //   baseDir: 'build'
          // }
        });
        gulp.watch(['src/main/**/*'], [prefix + 'build:main', reload]);
        gulp.watch(['src/resource/**/*'], [prefix + 'build:resource', reload]);
        gulp.watch(['src/test/**/*'], [prefix + 'build:test']);
      }
    }
  };
};