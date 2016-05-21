const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

module.exports = function (gulp) {
  function compileTs(source, dest) {
    var tsProject = typescript.createProject('tsconfig.json');
    return function () {
      var sourceTsFiles = ['src/' + source + '/**/*.ts', 'typings/browser/**/*.ts', 'typings/browser.d.ts',
        'build/vendor/**/*.d.ts'];

      var tsSourceResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

      tsSourceResult.dts.pipe(gulp.dest(dest));
      return tsSourceResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
    }
  }

  return {
    main: compileTs('main', 'build/main'),
    test: compileTs('test', 'build/test')
  };
};