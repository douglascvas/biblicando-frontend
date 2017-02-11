import {AppContainer} from "react-hot-loader";
import * as ReactDOM from "react-dom";
import * as React from "react";
import routes from "./routes";
import {Router, browserHistory} from "react-router";
import {ErrorReporter} from "./ErrorReporter";

function renderApp(currentRoutes) {
  const root = document.getElementById("root");
  ReactDOM.render(
    <AppContainer errorReporter={ErrorReporter}>
      <Router history={browserHistory} routes={currentRoutes}/>
    </AppContainer>,
    root
  );
}

renderApp(routes);

// Hot Module Replacement API
const m: any = module;
if (m.hot) {
  m.hot.accept(["./scripts/index.tsx", "./scripts/routes.tsx"], () => {
    const currentRoutes = require("./routes").default;
    renderApp(currentRoutes);
  });
}
