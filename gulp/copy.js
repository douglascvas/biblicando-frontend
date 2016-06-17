const paths = require('../paths');
const changed = require('gulp-changed');

module.exports = function (gulp) {
  function processHtml() {
    return gulp.src(paths.html)
      .pipe(changed(paths.output, {extension: '.html'}))
      .pipe(gulp.dest(paths.output));
  }

  function processConfig() {
    return gulp.src(paths.config)
      .pipe(changed(paths.output))
      .pipe(gulp.dest(paths.output));
  }

  function processCss() {
    return gulp.src(paths.css)
      .pipe(changed(paths.output, {extension: '.css'}))
      .pipe(gulp.dest(paths.output));
  }

  return {
    main: function () {
      processConfig();
      processHtml();
      processCss();
    },
    resource: function () {
      return gulp.src(paths.resource)
        .pipe(changed(paths.output))
        .pipe(gulp.dest(paths.output));
    },
    test: function () {
      return gulp.src(paths.test)
        .pipe(changed(paths.output, {extension: '.ts'}))
        .pipe(gulp.dest(paths.output));
    }
  };
};