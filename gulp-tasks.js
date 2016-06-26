module.exports = function (gulp, options) {
  const copy = require('./gulp/copy');
  const compile = require('./gulp/compile');
  const clean = require('./gulp/clean');
  const watch = require('./gulp/watch');
  const start = require('./gulp/start');
  const sass = require('./gulp/sass');

  gulp.task('fe-clean:main', clean.main);
  gulp.task('fe-clean:css', clean.css);
  gulp.task('fe-clean:img', clean.img);
  gulp.task('fe-clean:font', clean.font);
  gulp.task('fe-clean:test', clean.test);
  gulp.task('fe-compile:main', compile.main);
  gulp.task('fe-compile:test', compile.test);
  gulp.task('fe-copy:main', copy.main);
  gulp.task('fe-copy:test', copy.test);
  gulp.task('fe-copy:img', gulp.series('fe-clean:img', copy.img));
  gulp.task('fe-copy:font', gulp.series('fe-clean:font', copy.font));
  gulp.task('fe-sass', gulp.series('fe-clean:css', sass));
  gulp.task('fe-build:main', gulp.series('fe-clean:main', 'fe-copy:main', 'fe-compile:main'));
  gulp.task('fe-build:test', gulp.series('fe-clean:test', 'fe-copy:test', 'fe-compile:test'));
  gulp.task('fe-build', gulp.parallel('fe-sass', 'fe-copy:img', 'fe-copy:font', 'fe-build:main', 'fe-build:test'));
  gulp.task('fe-start', gulp.series('fe-build', start));
  gulp.task('fe-watch', watch(gulp, options));
  gulp.task('fe-dev', gulp.series('fe-start', watch(gulp, options)));
};
