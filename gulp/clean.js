const del = require('del');
const paths = require('../paths');

module.exports = {
  scripts: function cleanScripts() {
    return del(paths.output.dirs.scripts);
  },
  styles: function cleanStyles() {
    return del(paths.output.dirs.styles);
  },
  files: function cleanFonts() {
    return del(paths.output.files.files);
  },
  output: function cleanOutput() {
    return del(paths.other.clean);
  }
};
