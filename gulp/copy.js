module.exports = function (gulp) {
  return {
    main: function () {
      return gulp.src(['src/main/**/*', '!src/main/**/*.ts'], {base: './src/'})
        .pipe(gulp.dest('build'));
    },
    resource: function () {
      return gulp.src(['src/resource'], {base: './src/'})
        .pipe(gulp.dest('build'));
    },
    test: function () {
      return gulp.src(['src/test/**/*', '!src/test/**/*.ts'], {base: './src/'}).pipe(gulp.dest('build'))
    }
  };
};