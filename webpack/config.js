const path = require('path');
const util = require('util');
const pkg = require('../package.json');
const loaders = require('./loaders');
const plugins = require('./plugins');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');

function getAppEntry(options) {
  const devEntries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${options.devHost}:${options.devPort}`,
    'webpack/hot/only-dev-server'
  ];
  return [
    ...(options.development ? devEntries : []),
    options.useGulp ? './scripts/index.js' : './scripts/index.tsx'
  ];
}

function getVendorEntry(options) {
  let production = ['react', 'react-dom', 'react-helmet', 'react-router', 'axios'];
  let development = [];
  return [...production, ...(options.development ? development : [])]
}

function getEntries(options) {
  const entries = {
    app: getAppEntry(options),
    vendor: getVendorEntry(options)
  };
  return entries;
}

module.exports = (options) => ({
  context: options.useGulp ? paths.output.dirs.js : paths.input.dirs.source,
  cache: options.development,
  target: 'web',
  devtool: options.development ? 'inline-source-map' : false,
  entry: getEntries(options),
  output: {
    path: path.resolve(options.buildDir + '/dist/'),
    publicPath: '/',
    filename: `scripts/[name].${options.version}.js`,
    pathinfo: false,
    // sourceMapFilename: `scripts/[name].${options.version}.map`
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  module: {
    rules: loaders(options)
  },
  plugins: plugins(options),
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', 'jsx', '.json'],
  },
  devServer: {
    contentBase: path.resolve(options.buildDir) + '/dist',
    historyApiFallback: true,
    port: options.devPort,
    publicPath: '/',
    hot: true,
    noInfo: false,
    inline: true,
    stats: {colors: true}
  }
});
