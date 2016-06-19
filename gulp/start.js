var net = require('net');

var portInUse = function (port, callback) {
  var server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  });

  server.listen(port, '127.0.0.1');
  server.on('error', function (e) {
    callback(true);
  });
  server.on('listening', function (e) {
    server.close();
    callback(false);
  });
};

function waitForApplication(port, callback) {
  const interval = setInterval(()=> {
    portInUse(port, used => {
      console.log("### Port used:", used);
      if (used) {
        clearInterval(interval);
        return callback();
      }
    })
  }, 500);
}

module.exports = function () {
  return {
    start: function (cb) {
      var server = require('gulp-express');
      server.run([__dirname + '/../index.js']);

      waitForApplication(3000, cb);
    }
  };
};
