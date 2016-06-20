const path = require('path');
const srcRoot = absolutePath('src/');
const mainRoot = `${srcRoot}/main`;
const resourceRoot = absolutePath('src/resource/');
const testRoot = absolutePath('src/test/');
const outputRoot = absolutePath('build/');

function absolutePath(relativePath) {
  return path.resolve(`${__dirname}/${relativePath}`);
}

module.exports = {
  root: `${srcRoot}`,
  baseMain: `${mainRoot}`,
  baseResource: `${resourceRoot}`,
  baseTest: `${testRoot}`,
  tsConfig: absolutePath(`tsconfig.json`),
  source: `${mainRoot}/**/*.ts`,
  html: `${mainRoot}/**/*.html`,
  css: `${mainRoot}/**/*.css`,
  style: `${mainRoot}styles/**/*.css`,
  test: `${testRoot}/test/**/*.ts`,
  resource: `${resourceRoot}/**/*`,
  output: `${outputRoot}`,
  outputMain: `${outputRoot}/main`,
  outputResource: `${outputRoot}/resource`,
  outputTest: `${outputRoot}/test`,
  e2eSpecsSrc: `${testRoot}/e2e/src/**/*.ts`,
  e2eSpecsDist: `${testRoot}/e2e/dist/`,
  dtsSrc: [
    absolutePath('typings/**/*.d.ts')
  ]
};