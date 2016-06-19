const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
// const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');
const paths = require('../paths');

module.exports = function (gulp) {
  function compileTs(source, dest) {
    var typescriptCompiler = typescriptCompiler || null;
    return function () {
      if (!typescriptCompiler) {
        typescriptCompiler = typescript.createProject(paths.tsConfig, {
          "typescript": require('typescript')
        });
      }
      return gulp.src(paths.dtsSrc.concat(source))
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(typescript(typescriptCompiler))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
        .pipe(gulp.dest(paths.output));
    };
    // var tsProject = typescript.createProject(__dirname + '/../tsconfig.json');
    // return function () {
    //   var sourceTsFiles = tsconfig.filesGlob;
    //
    //   var tsSourceResult = gulp.src(sourceTsFiles)
    //     .pipe(sourcemaps.init())
    //     .pipe(typescript(tsProject));
    //
    //   tsSourceResult.dts.pipe(gulp.dest(dest));
    //   return tsSourceResult.js
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest(dest));
    // }
  }

  return {
    main: compileTs(paths.source, 'build'),
    test: compileTs(paths.test, 'build')
  };
};