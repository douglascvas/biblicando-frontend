const path = require('path');
const util = require('util');
const pkg = require('../package.json');
const loaders = require('./loaders');
const plugins = require('./plugins');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');

const options = Object.assign({}, {
  useGulp: true,
  version: pkg.version,
  development: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
}, pkg.config);

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
  let production = ['react', 'react-dom', 'react-helmet'];
  let development = [];//['source-map-support', './dev'];
  return [...production, ...(options.development ? development : [])]
}

module.exports = {
  context: options.useGulp ? paths.output.dirs.root : paths.input.dirs.source,
  cache: options.development,
  target: 'web',
  devtool: options.development ? 'source-map' : false,
  entry: {
    app: getAppEntry(options),
    vendor: getVendorEntry(options)
  },
  output: {
    path: path.resolve(options.buildDir + '/dist/'),
    publicPath: '/',
    filename: `scripts/[name].${options.version}.js`,
    pathinfo: false,
    sourceMapFilename: `scripts/[name].${options.version}.map`
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
};
