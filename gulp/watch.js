module.exports = function (gulp) {
  return {
    watch: function () {
      gulp.watch(['src/main/**/*'], ['build:main']);
      gulp.watch(['src/resource/**/*'], ['build:resource']);
      gulp.watch(['src/test/**/*'], ['build:test']);
    }
  };
};