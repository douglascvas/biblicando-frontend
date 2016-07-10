var gulp = require('gulp');
var bundle = require('aurelia-bundler').bundle;
var paths = require('../paths');

var config = {
  force: true,
  baseURL: paths.output + '/',                   // baseURL of the application
  configPath: paths.output + '/config.js',      // config.js file. Must be within `baseURL`
  bundles: {
    // "./build/app-build": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
    //   includes: [
    //     '[*.js]',
    //     // '*.html!text',
    //     // '*.css!text',
    //   ],
    //   options: {
    //     inject: true,
    //     minify: true
    //   }
    // },
    "vendor/bundle": {
      includes: [
        // "aurelia-animator-css",
        "kefir",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-framework",
        // "aurelia-history-browser",
        "aurelia-http-client",
        "aurelia-loader-default",
        // "aurelia-logging-console",
        // "aurelia-pal",
        // "aurelia-pal-browser",
        "aurelia-polyfills",
        "aurelia-router",
        "aurelia-templating",
        "aurelia-templating-binding",
        "aurelia-templating-resources",
        "aurelia-templating-router"
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

module.exports = function bundleTask() {
  return bundle(config);
};