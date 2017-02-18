import * as express from "express";
import * as React from "react";
import * as compression from "compression";
import * as ReactDOMServer from "react-dom/server";
import {match, RouterContext} from "react-router";
import * as sourceMapSupport from "source-map-support";
import * as WebpackDevServer from "webpack-dev-server";
import * as webpack from "webpack";
import * as nunjucks from "nunjucks";
import * as path from "path";

// copied by gulp
const packageJson = require('./package.json');

const devMode = process.env.NODE_ENV === 'development';
const port = process.env.PORT || packageJson.config.port;
const host = process.env.HOST || packageJson.config.host;

function configureServer(app) {

  app.set('port', port);
  app.set('views', __dirname);
  app.set('view engine', 'html');
  nunjucks.configure(app.get('views'), {
    autoescape: false,
    express: app
  });
  app.use(compression());
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use((req, res, next) => {
    const routesPath = './scripts/routes';
    delete require.cache[require.resolve(routesPath)];
    const routes = require(routesPath).default;
    match({routes: routes, location: req.url}, (error, redirectLocation, renderProps: any) => {
      console.log(`Navigating to ${req.url}`);
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (!renderProps || renderProps.routes[renderProps.routes.length - 1].path === '*') {
        next();
      } else {
        const html = devMode ? '' : ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
        return res.render('index', {content: html, title: 'Home', version: packageJson.version});
      }
    });
  });
}

function createServer() {
  if (devMode) {
    const webpackConfig = require('../../webpack/config');
    console.log('Creating dev server...');
    return new WebpackDevServer(webpack(webpackConfig), Object.assign({
      setup: app => configureServer(app)
    }, webpackConfig.devServer));
  }
  console.log('Creating production server...');
  const app = express();
  configureServer(app);
  return app;
}

sourceMapSupport.install();

const server = createServer();
server.listen(port, host, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}`);
});
