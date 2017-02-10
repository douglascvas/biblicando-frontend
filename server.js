// const util = require('util');
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const opn = require('opn');
// const pkg = require('./package.json');
// const React = require('react');
// const ReactRouter = require('react-router');
// const ReactDOMServer = require('react-dom').server;
// const compression = require('compression');
// const path = require('path');
//
// const port = pkg.config.devPort;
// const host = pkg.config.devHost;
//
// const configPath = process.argv[2] || './webpack/config';
// const config = require(configPath);
// const compiler = webpack(config);
//
// const server = new WebpackDevServer(compiler, Object.assign({
//   setup: app => {
//     app.set('port', process.env.PORT || 3000);
//     app.set('views', path.join(__dirname, 'views'));
//     app.set('view engine', 'vash');
//     app.use((req, res, next) => {
//       console.log(compiler);
//       const routes = require('./dist/script/app.0.0.1.js');
//       ReactRouter.match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
//         console.log(`Navigating to ${req.url}`);
//         if (error) {
//           res.status(500).send(error.message)
//         } else if (redirectLocation) {
//           res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//         } else if (!renderProps || renderProps.routes[renderProps.routes.length - 1].path === '*') {
//           res.status(404).send('Not found');
//         } else {
//           let element = React.createElement(ReactRouter.RouterContext, React.cloneElement(renderProps), null);
//           let content = ReactDOMServer.renderToString(element);
//           res.render('main', {content: content, title: 'Home', min: min});
//         }
//       });
//     });
//   }
// }, config.devServer));
//
//
// server.listen(port, host, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   const url = util.format('http://%s:%d', host, port);
//   console.log('Listening at %s', url);
//   // opn(url);
// });
