const util = require('util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const pkg = require('../package.json');

module.exports = (options) => () => {
  const port = options.devPort;
  const host = options.devHost;

  const configPath = '../webpack/config';
  const config = require(configPath);

  const server = new WebpackDevServer(webpack(config), config.devServer);

  server.listen(port, host, function (err) {
    if (err) {
      console.log(err);
    }
    const url = util.format('http://%s:%d', host, port);
    console.log('Listening at %s', url);
    // opn(url);
  });
};
