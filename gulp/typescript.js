const gulp = require('gulp');
const gulpif = require('gulp-if');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');
const paths = require('../paths');
const tsify = require('tsify');
const watchify = require('watchify');
const tsConfig = require('../tsconfig.json');

let tsProjects = {};
let isolatedModules = false;

function makeTsProject(name, options) {
  let optionsHash = JSON.stringify(options) + name;
  if (!tsProjects[optionsHash]) {
    let config = Object.assign({typescript: require('typescript')}, options);
    tsProjects[optionsHash] = typescript.createProject(paths.config.ts, config);
  }
  return tsProjects[optionsHash];
}

const compile = (name, options, input, output) => {
  let tsProject = makeTsProject(name, {
    isolatedModules: isolatedModules
  });
  if (!isolatedModules) {
    isolatedModules
  }
  return gulp
    .src(input)
    .pipe(gulpif(isolatedModules, plumber()))
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output));
};

module.exports = options => () => {
  return compile('client', options, tsConfig.include, paths.output.dirs.root);
};

