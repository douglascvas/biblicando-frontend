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

function configureServer(app, options) {
  app.set('port', process.env.PORT || options.devPort);
  app.set('views', __dirname);
  app.set('view engine', 'html');
  nunjucks.configure(app.get('views'), {
    autoescape: false,
    express: app
  });
  app.use(compression());
  app.use(express.static(path.join(__dirname, './dist/')));
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
        const html = options.serverSideRendering ? ReactDOMServer.renderToString(<RouterContext {...renderProps} />) : '';
        return res.render('index', {content: html, title: 'Home', version: options.version});
      }
    });
  });
}

function createServer(webpackConfig, options) {
  if (options.development) {
    console.log('Creating dev server...');
    return new WebpackDevServer(webpack(webpackConfig), Object.assign({
      setup: app => configureServer(app, options)
    }, webpackConfig.devServer));
  }
  console.log('Creating production server...');
  return express();
}

export default (options) => {
  sourceMapSupport.install();

  console.log('Server side rendering ' + (options.serverSideRendering ? 'ENABLED' : 'DISABLED'));
  console.log('Options:', options);

  const port = options.devPort;
  const host = options.devHost;

  const configPath = '../webpack/config';
  const config = require(configPath);

  const server = createServer(config, options);

  server.listen(port, host, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at http://${host}:${port}`);
    // opn(url);
  });
};
