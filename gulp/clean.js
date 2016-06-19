const del = require('del');
const paths = require('../paths');

module.exports = function () {
  return {
    main: function () {
      return del(paths.outputMain);
    },
    resource: function () {
      return del(paths.outputResource);
    },
    test: function () {
      return del(paths.outputTest);
    }
  };
};