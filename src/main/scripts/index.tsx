import * as ReactDOM from "react-dom";
import * as React from "react";
import routes from "./routes";
import {Router, browserHistory} from "react-router";

const root = document.getElementById("root");
const devEnvironment: boolean = (process.env.NODE_ENV === 'development');

function renderAppDev(currentRoutes, AppContainer) {
  const errorReporter = require('./ErrorReporter');
  ReactDOM.render(
    <AppContainer errorReporter={errorReporter}>
      <Router history={browserHistory} routes={currentRoutes}/>
    </AppContainer>,
    root
  );
}

function renderAppProd(currentRoutes) {
  ReactDOM.render(<Router history={browserHistory} routes={currentRoutes}/>, root);
}

function startDevSession() {
  const appContainer = require("react-hot-loader").AppContainer;
  // Hot Module Replacement API
  const m: any = module;
  if (m.hot) {
    m.hot.accept(["./scripts/index.tsx", "./scripts/routes.tsx", "./scripts/ErrorReporter.tsx"], () => {
      const currentRoutes = require("./routes").default;
      renderAppDev(currentRoutes, appContainer);
    });
  }
  renderAppDev(routes, appContainer);
}

if (devEnvironment) {
  startDevSession();
} else {
  renderAppProd(routes);
}

