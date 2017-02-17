const gulp = require('gulp');
const scss = require('./gulp/scss');
const typescript = require('./gulp/typescript');
const clean = require('./gulp/clean');
const watch = require('./gulp/watch');
const scripts = require('./gulp/scripts');
const files = require('./gulp/files');
const html = require('./gulp/html');
const vendor = require('./gulp/vendor');
const webpack = require('./gulp/webpack');
const app = require('./gulp/app');
const pkg = require('./package.json');

const devServer = function (options) {
  return () => require('./build/main/server').default(options);
};

const options = Object.assign({}, {
  version: pkg.version,
  development: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  serverSideRendering: !process.env.NO_SSR
}, pkg.config);

gulp.task('clean:images', clean.scripts);
gulp.task('clean:styles', clean.styles);
gulp.task('clean:scripts', clean.scripts);
gulp.task('clean:files', clean.files);
gulp.task('clean', clean.output);

gulp.task('typescript', typescript(options));
gulp.task('files', files(options));
gulp.task('html', html(options));
gulp.task('scripts', scripts(options));
gulp.task('scss', scss(options));
gulp.task('vendor', vendor(options));
gulp.task('watch', watch(options));
gulp.task('app', app(options));
gulp.task('webpack', webpack(options));
gulp.task('dev-server', devServer(options));

gulp.task('build', gulp.series('clean', gulp.parallel('typescript', 'files', 'html', 'scripts', 'scss'), 'webpack'));
gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('dev-server', watch(options))));
