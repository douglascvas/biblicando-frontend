const pkg = require('./package.json');
const paths = require('./paths');

module.exports = Object.assign({}, {
  paths: paths,
  version: pkg.version,
  development: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  serverSideRendering: !process.env.NO_SSR
}, pkg.config);
