'use strict';

const Q = require('q');
const express = require('express');

const request = require('request-promise');
const compress = require('compression');
const Configurator = require('configurator-js');
const moduleInfo = require('./package.json');

module.exports = class Server {
  constructor(app, config) {
    this.app = app;
    this.config = config;
  }

  static build(app) {
    const CONFIG_PATH = process.env.CONFIG_PATH || __dirname + "/config.yml";

    app = app || express();
    const config = new Configurator(CONFIG_PATH, moduleInfo.name, moduleInfo.version);

    return new Server(app, config);
  }

  configureServer() {
    this.app.use(compress());
    this.app.use(express.static(`${__dirname}/build/main`));
    this.app.use(express.static(`${__dirname}/build/resource`));
    this.app.use(express.static(`${__dirname}/build`));
  }

  startServer(app, config) {
    var clientConfig = config.get('client');
    var port = clientConfig.port || 3010;
    return app.listen(port, function () {
      console.log(`### Listening on port ${port}`);
    });
  }

  initialize() {
    this.configureServer();
    return Q.when();
  }

  start() {
    return this.startServer(this.app, this.config);
  }
};