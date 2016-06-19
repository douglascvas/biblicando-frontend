const paths = require('../paths');
const changed = require('gulp-changed');

module.exports = function (gulp) {
  function processHtml() {
    return gulp.src(paths.html)
      .pipe(changed(paths.outputMain, {extension: '.html'}))
      .pipe(gulp.dest(paths.outputMain));
  }

  function processConfig() {
    return gulp.src(paths.config)
      .pipe(changed(paths.outputMain))
      .pipe(gulp.dest(paths.outputMain));
  }

  function processCss() {
    return gulp.src(paths.css)
      .pipe(changed(paths.outputMain, {extension: '.css'}))
      .pipe(gulp.dest(paths.outputMain));
  }

  return {
    main: function () {
      processConfig();
      processHtml();
      processCss();
    },
    resource: function () {
      return gulp.src(paths.resource)
        .pipe(changed(paths.outputMain))
        .pipe(gulp.dest(paths.outputMain));
    },
    test: function () {
      // return gulp.src(paths.test)
      //   .pipe(changed(paths.outputTest))
      //   .pipe(gulp.dest(paths.outputTest));
    }
  };
};