const path = require('path');
const root = absolutePath('./');

function absolutePath(relativePath) {
  return path.resolve(`${__dirname}/${relativePath}`);
}

const paths = {
  typings: `${root}/typings`,
  source: `${root}/src/main`,
  output: `${root}/build`,
  dist: `${root}/build/dist`
};

const fileExtensions = `{otf,eot,svg,woff,woff2,ico,jpg,jpeg,png,json}`;

module.exports = {
  config: {
    ts: `${root}/tsconfig.json`,
    project: `${root}/package.json`
  },
  input: {
    dirs: {
      source: `${paths.source}`,
      scripts: `${paths.source}/scripts`
    },
    files: {
      app: `${paths.source}/scripts/app.tsx`,
      // Source to compile
      ts: [
        `${paths.typings}/**/*.ts`,
        `${paths.source}/**/*.ts`,
        `${paths.source}/**/*.tsx`
      ],

      // Styles
      styles: `${paths.source}/styles/**/*.css`,
      stylesMin: `${paths.source}/styles/**/*.min.css`,
      scss: [`${paths.source}/scss/**/*.scss`],

      // Scripts
      scripts: `${paths.source}/scripts/**/*.js`,
      scriptsMin: `${paths.source}/scripts/**/*.min.js`,
      vendor_js: [
        'history',
        'react',
        'react-dom',
        'react-router'
      ],
      extern_js: [
        // 'node_modules/q/q.js',
      ],
      polyfill_js: [
        // `${paths.source}polyfills/Object.assign.js'
      ],

      // Miscellaneous files to copy
      files: [`${paths.source}/**/*.${fileExtensions}`],
      html: [`${paths.source}/**/*.html`],

      views: [`${paths.source}/views/**/*.*`]
    }
  },
  output: {
    files: {
      styles: `${paths.output}/styles/app.css`,
      scripts: `./app.js`,
      server: `${paths.output}/scripts/server.js`,
      files: [`${paths.output}/**/*.${fileExtensions}`]
    },
    dirs: {
      tempScripts: `${paths.output}/app`,
      images: `${paths.dist}/images`,
      files: `${paths.dist}`,
      dist: `${paths.dist}`,
      js: `${paths.output}/main`,
      htmlTemplates: `${paths.output}/main`,
      root: paths.output,
      styles: `${paths.dist}/styles`,
      scripts: `${paths.dist}/scripts`,
      polyfills: `${paths.dist}/polyfills`,
      views: `${paths.output}/views`
    }
  },
  other: {
    clean: `${paths.output}`,
    output_typings: 'output/typings',
    // An intermediate file; output from tsx, input to bundle.
    app_js: `${paths.output}/scripts/app.js`
  }
};
