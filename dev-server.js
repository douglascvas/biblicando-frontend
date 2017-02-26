const util = require('util');
const webpack = require('webpack');
const opn = require('opn');
const pkg = require('./package.json');
const express = require('express');
const config = require('./webpack/config');
const paths = require('./paths');

const app = express();
const compiler = webpack(config);

const port = pkg.config.port;
const host = pkg.config.host;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(`${paths.output.dirs.root}/index.html`);
});

app.listen(port, host, function (err) {
  if (err) {
    console.log(err);
  }
  const url = util.format('http://%s:%d', host, port);
  console.log('Listening at %s', url);
  // opn(url);
});
