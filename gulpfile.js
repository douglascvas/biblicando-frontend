const gulp = require('gulp');
const scss = require('./gulp/scss');
const typescript = require('./gulp/typescript');
const clean = require('./gulp/clean');
const watch = require('./gulp/watch');
const scripts = require('./gulp/scripts');
const files = require('./gulp/files');
const html = require('./gulp/html');
const package = require('./gulp/package');
const webpack = require('./gulp/webpack');
const app = require('./gulp/app');
const paths = require('./paths');
const options = require('./projectOptions');

const server = function () {
  return () => require('./build/main/server');
};

gulp.task('clean:images', clean.scripts);
gulp.task('clean:styles', clean.styles);
gulp.task('clean:scripts', clean.scripts);
gulp.task('clean:files', clean.files);
gulp.task('clean', clean.output);

gulp.task('typescript', typescript(options));
gulp.task('files', files(options));
gulp.task('package', package(options));
gulp.task('html', html(options));
gulp.task('scripts', scripts(options));
gulp.task('scss', scss(options));
gulp.task('watch', watch(options));
gulp.task('app', app(options));
gulp.task('webpack', webpack(options));
gulp.task('server', server(options));

gulp.task('build', gulp.series('clean', gulp.parallel('typescript', 'files', 'html', 'scripts', 'scss', 'package'), 'webpack'));
gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('server', watch(options))));
gulp.task('start', gulp.series('clean', 'build', 'server'));
