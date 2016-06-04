const Server = require('./server');
const server = Server.build();
var initialized = server.initialize()
  .then(()=>server.start());

module.exports = function () {
  return initialized;
};