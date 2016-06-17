var nodemon = require('gulp-nodemon');
var idx = require('../index');

module.exports = function () {
  return {
    start: function (cb) {
      // var server = require('gulp-express');
      // server.run([__dirname + '/../index.js']);
      // cb();
      var started = false;
      // idx().then(function () {
      //   console.log("##### started");
      //   cb();
      // });
      return nodemon({
        script: __dirname + '/../index.js',
        ignore: "*.*",
        watch: ['*.jsx'],
        ext: 'js'
      }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        console.log("##### started");
        if (!started) {
          started = true;
          cb();
        }
      }).on('restart', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        console.log("##### restarted");
      });
    }
  };

};
