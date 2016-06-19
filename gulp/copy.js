const paths = require('../paths');
const changed = require('gulp-changed');

module.exports = function (gulp) {
  function processHtml() {
    var result = gulp.src(paths.html)
      .pipe(changed(paths.outputMain, {extension: '.html'}))
      .pipe(gulp.dest(paths.outputMain));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
  }

  function processConfig() {
    var result = gulp.src(paths.config)
      .pipe(changed(paths.outputMain))
      .pipe(gulp.dest(paths.outputMain));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
  }

  function processCss() {
    var result = gulp.src(paths.css)
      .pipe(changed(paths.outputMain, {extension: '.css'}))
      .pipe(gulp.dest(paths.outputMain));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
  }

  return {
    main: function () {
      processConfig();
      processHtml();
      processCss();
    },
    resource: function () {
      var result = gulp.src(paths.resource)
        .pipe(changed(paths.outputMain))
        .pipe(gulp.dest(paths.outputMain));
      result.on('error', error => console.log("## ERROR - ", error));
      return result;
    },
    test: function () {
      // return gulp.src(paths.test)
      //   .pipe(changed(paths.outputTest))
      //   .pipe(gulp.dest(paths.outputTest));
    }
  };
};