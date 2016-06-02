'use strict';

import * as Q from "q"
import * as express from "express";

const request = require('request-promise');
// const express = require('express');
const compress = require('compression');
const Configurator = require('configurator-js');
const moduleInfo = require('./package.json');

export class Server {
  constructor(private app,
              private config) {
  }

  public static build() {
    const CONFIG_PATH = process.env.CONFIG_PATH || __dirname + "/config.yml";

    const app = express();
    const config = new Configurator(CONFIG_PATH, moduleInfo.name, moduleInfo.version);

    return new Server(app, config);
  }

  private configureServer() {
    this.app.use(compress());
    this.app.use(express.static('./build/main'));
    this.app.use(express.static('./build/resource'));
    this.app.use(express.static('./build'));
  }

  private startServer(app, config) {
    var clientConfig = config.get('client');
    var port = clientConfig.port || 3000;
    return app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  }

  public initialize() {
    this.configureServer();
    return Q.when();
  }

  public start() {
    return this.startServer(this.app, this.config);
  }
}