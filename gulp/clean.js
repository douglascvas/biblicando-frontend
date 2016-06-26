const del = require('del');
const paths = require('../paths');

module.exports = {
  main: function cleanMain() {
    return del(paths.outputMain);
  },
  resource: function cleanResource() {
    return del(paths.outputResource);
  },
  test: function cleanTest() {
    return del(paths.outputTest);
  },
  css: function CleanCss() {
    return del(paths.outputCss);
  },
  img: function cleanImg() {
    return del(paths.outputImage);
  },
  font: function cleanFont() {
    return del(paths.outputFont);
  }
};