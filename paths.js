const path = require('path');
const srcRoot = absolutePath('src/');
const mainRoot = `${srcRoot}/main`;
const styleRoot = `${srcRoot}/style`;
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
  baseStyle: `${styleRoot}`,
  baseSass: `${styleRoot}/sass`,
  baseImg: `${styleRoot}/img`,
  baseFont: `${styleRoot}/fonts`,
  baseTest: `${testRoot}`,
  tsConfig: absolutePath(`tsconfig.json`),
  source: `${mainRoot}/**/*.ts`,
  html: `${mainRoot}/**/*.html`,
  css: `${mainRoot}/**/*.css`,
  sass: `${styleRoot}/sass/**/*.scss`,
  img: `${styleRoot}/img/**/*.*`,
  font: `${styleRoot}/fonts/**/*.*`,
  test: `${testRoot}/test/**/*.ts`,
  resource: `${resourceRoot}/**/*`,
  output: `${outputRoot}`,
  outputMain: `${outputRoot}/main`,
  outputCss: `${outputRoot}/style/css`,
  outputImage: `${outputRoot}/style/img`,
  outputFont: `${outputRoot}/style/fonts`,
  outputResource: `${outputRoot}/resource`,
  outputTest: `${outputRoot}/test`,
  e2eSpecsSrc: `${testRoot}/e2e/src/**/*.ts`,
  e2eSpecsDist: `${testRoot}/e2e/dist/`,
  dtsSrc: [
    absolutePath('typings/**/*.d.ts')
  ]
};