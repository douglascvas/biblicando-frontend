const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsconfig = require('../tsconfig.json');

module.exports = function (gulp) {
  function compileTs(source, dest) {
    var tsProject = typescript.createProject(__dirname + '/../tsconfig.json');
    return function () {
      var sourceTsFiles = tsconfig.filesGlob;

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
    main: compileTs('main', 'build'),
    test: compileTs('test', 'build')
  };
};