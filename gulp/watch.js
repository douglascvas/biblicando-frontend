module.exports = function (gulp) {
  return {
    watch: function (prefix) {
      return function () {
        gulp.watch(['src/main/**/*'], [prefix + 'build:main']);
        gulp.watch(['src/resource/**/*'], [prefix + 'build:resource']);
        gulp.watch(['src/test/**/*'], [prefix + 'build:test']);
      }
    }
  };
};