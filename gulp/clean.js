const del = require('del');

module.exports = function (gulp) {
  return {
    main: function () {
      return del('build/main');
    },
    resource: function () {
      return del('build/resource');
    },
    test: function () {
      return del('build/test');
    }
  };
};