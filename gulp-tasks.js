module.exports = function (gulp, options) {
  const copy = require('./gulp/copy');
  const compile = require('./gulp/compile');
  const clean = require('./gulp/clean');
  const watch = require('./gulp/watch');
  const start = require('./gulp/start');

  gulp.task('fe-clean:main', clean.main);
  gulp.task('fe-clean:test', clean.test);
  gulp.task('fe-clean:resource', clean.resource);
  gulp.task('fe-compile:main', compile.main);
  gulp.task('fe-compile:test', compile.test);
  gulp.task('fe-copy:main', copy.main);
  gulp.task('fe-copy:resource', copy.resource);
  gulp.task('fe-copy:test', copy.test);
  gulp.task('fe-build:main', gulp.series('fe-clean:main', 'fe-copy:main', 'fe-compile:main'));
  gulp.task('fe-build:resource', gulp.series('fe-clean:resource', 'fe-copy:resource'));
  gulp.task('fe-build:test', gulp.series('fe-clean:test', 'fe-copy:test', 'fe-compile:test'));
  gulp.task('fe-build', gulp.parallel('fe-build:resource', 'fe-build:main', 'fe-build:test'));
  gulp.task('fe-start', gulp.series('fe-build', start));
  gulp.task('fe-watch', watch(gulp, options));
  gulp.task('fe-dev', gulp.series('fe-start', watch(gulp, options)));
};
