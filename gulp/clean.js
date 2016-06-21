const del = require('del');
const paths = require('../paths');

module.exports = {
  main: function () {
    return del(paths.outputMain);
  },
  resource: function () {
    return del(paths.outputResource);
  },
  test: function () {
    return del(paths.outputTest);
  },
  css: function () {
    return del(paths.outputCss);
  },
  img: function () {
    return del(paths.outputImage);
  }
};