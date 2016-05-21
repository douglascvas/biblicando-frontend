'use strict';

const Configurator = require('configurator-js');
const moduleInfo = require('./package.json');
const request = require('request-promise');
const CONFIG_PATH = process.env.CONFIG_PATH || __dirname + "/config.yml";
const express = require('express');
var compress = require('compression');

function createServer() {
  const app = express();
  app.use(compress());
  app.use(express.static('./build/main'));
  app.use(express.static('./build/resource'));
  app.use(express.static('./build'));
  return app;
}

function loadConfiguration() {
  console.log("Loading configuration from ", CONFIG_PATH);
  return new Configurator(CONFIG_PATH, moduleInfo.name, moduleInfo.version);
}

function startServer(app, config) {
  var clientConfig = config.get('client');
  var port = clientConfig.port || 3000;
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });
}

function initialize() {
  var config = loadConfiguration();
  var app = createServer();
  startServer(app, config);
}

return initialize();