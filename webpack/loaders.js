const path = require('path');
const autoPrefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('../paths');

function getBaseCssRules(options) {
  return [
    {
      loader: 'css-loader',
      options: {
        camelCase: true,
        sourceMap: options.development,
        modules: true,
        importLoaders: 1,
        localIdentName: (options.development ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]')
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [autoPrefixer];
        }
      }
    }
  ];
}

function getCssRules(options) {
  const rules = getBaseCssRules(options);
  return options.development ? rules : ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: rules});
}

function getSassRules(options) {
  const rules = getBaseCssRules(options).concat([
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        includePaths: [path.resolve(__dirname, '../src/scss'), path.resolve(__dirname, '../node_modules/materialize')],
        sourceMap: options.development,
        sourceMapContents: options.development
      }
    }
  ]);
  return options.development ? rules : ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: rules});
}


function getFileRule() {
  return {
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]'
    }
  };
}

function getHtmlRules(options) {
  return [
    getFileRule(),
    {
      loader: 'template-html-loader',
      options: {
        raw: true,
        engine: 'lodash',
        version: options.version,
        title: options.version,
        debug: options.development
      }
    }
  ];
}

module.exports = (options) => [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "source-map-loader",
    enforce: 'pre'
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'react-hot-loader/webpack',
    enforce: 'pre'
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
    include: paths.input.dirs.scripts,
  },
  {
    test: /\.css$/,
    use: getCssRules(options)
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff|\.ttf|\.eot$/,
    use: getFileRule()
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    use: 'json-loader'
  },
  {
    test: /\.html$/,
    use: getHtmlRules(options)
  },
  {
    test: /\.scss$/,
    use: getSassRules(options)
  }
];

