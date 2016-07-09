const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
// const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');
const paths = require('../paths');


function compileTs(source, dest) {
  var typescriptCompiler = typescriptCompiler || null;
  return function () {
    if (!typescriptCompiler) {
      typescriptCompiler = typescript.createProject(paths.tsConfig, {
        "typescript": require('typescript')
      });
    }
    var result = gulp.src(paths.dtsSrc.concat(source))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(typescript(typescriptCompiler))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.output));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
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

module.exports = {
  main: compileTs(paths.source, __dirname + '/build'),
  test: compileTs(paths.test, __dirname + '/build')
};