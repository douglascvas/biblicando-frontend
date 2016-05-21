const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = function (gulp) {
  return {
    serve: function (watchTask) {
      return function () {
        browserSync({
          proxy: "http://localhost:3000",
          open: false
          // server: {
          //   baseDir: 'build'
          // }
        });
        gulp.watch(['src/main/**/*'], ['build:main', reload]);
        gulp.watch(['src/resource/**/*'], ['build:resource', reload]);
        gulp.watch(['src/test/**/*'], ['build:test']);
      }
    }
  };
};