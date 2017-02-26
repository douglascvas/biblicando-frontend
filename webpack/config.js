const path = require('path');
const util = require('util');
const loaders = require('./loaders');
const plugins = require('./plugins');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');
const projectOptions = require('../projectOptions');

function getAppEntry(options) {
  const devEntries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${options.host}:${options.port}`,
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

module.exports = {
  context: projectOptions.useGulp ? paths.output.dirs.js : paths.input.dirs.source,
  cache: projectOptions.development,
  target: 'web',
  devtool: projectOptions.development ? 'inline-source-map' : false,
  entry: getEntries(projectOptions),
  output: {
    path: path.resolve(projectOptions.buildDir + '/dist/'),
    publicPath: '/',
    filename: `scripts/[name].${projectOptions.version}.js`,
    pathinfo: false,
    // sourceMapFilename: `scripts/[name].${projectOptions.version}.map`
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  module: {
    rules: loaders(projectOptions)
  },
  plugins: plugins(projectOptions),
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', 'jsx', '.json'],
  },
  devServer: {
    contentBase: path.resolve(projectOptions.buildDir) + '/dist',
    historyApiFallback: true,
    port: projectOptions.port,
    publicPath: '/',
    hot: true,
    noInfo: false,
    inline: true,
    stats: {colors: true}
  }
};
