var srcRoot = 'src/main/';
var resourceRoot = 'src/resource/';
var testRoot = 'src/test/';
var outputRoot = 'build/';
var exporSrvtRoot = 'export/';

module.exports = {
  root: `${srcRoot}`,
  config: `./config.js`,
  source: `${srcRoot}**/*.ts`,
  html: `${srcRoot}**/*.html`,
  css: `${srcRoot}**/*.css`,
  test: `${testRoot}test/**/*.ts`,
  style: `styles/**/*.css`,
  resource: `${resourceRoot}**/*`,
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  dtsSrc: [
    './typings/**/*.d.ts'
  ]
};