const gulp = require('gulp');

const tslint = require('gulp-tslint');

const copy = require('./gulp/copy')(gulp);
const compile = require('./gulp/compile')(gulp);
const clean = require('./gulp/clean')(gulp);
const watch = require('./gulp/watch')(gulp);
const serve = require('./gulp/serve')(gulp);

gulp.task('clean:main', clean.main);
gulp.task('clean:resource', clean.resource);
gulp.task('clean:test', clean.test);

// TypeScript compile
gulp.task('compile:main', compile.main);
gulp.task('compile:test', compile.test);

gulp.task('copy:main', ['clean:main'], copy.main);
gulp.task('copy:resource', ['clean:resource'], copy.resource);
gulp.task('copy:test', ['clean:test'], copy.test);

gulp.task('build', ['build:resource', 'build:main', 'build:test']);
gulp.task('build:test', ['copy:test', 'compile:test']);
gulp.task('build:main', ['copy:main', 'compile:main']);
gulp.task('build:resource', ['copy:resource']);

gulp.task('serve', ['build'], serve.serve(watch.watch));

// Run browsersync for development
gulp.task('watch', ['build'], watch.watch);

