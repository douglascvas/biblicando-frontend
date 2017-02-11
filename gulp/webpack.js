const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('../webpack/config');
const gutil = require("gulp-util");

module.exports = (options) => (cb) => {
  if (options.development) {
    return cb();
  }
  webpack(webpackConfig(options), (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString());
    cb();
  });
};
