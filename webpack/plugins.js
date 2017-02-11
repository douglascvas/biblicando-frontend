const path = require('path');
const util = require('util');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = (options) => {
  const cssBundle = path.join('css', util.format('[name].%s.css', options.version));
  const devPlugins = [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}}),
    new webpack.HotModuleReplacementPlugin()
  ];

  const distPlugins = [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin(),
  ];

  return [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    //
    new webpack.optimize.OccurrenceOrderPlugin,
    // new ExtractTextPlugin({filename: cssBundle, allChunks: true}),
    ...(options.development ? devPlugins : distPlugins),
    new webpack.NoEmitOnErrorsPlugin()
  ];
};
