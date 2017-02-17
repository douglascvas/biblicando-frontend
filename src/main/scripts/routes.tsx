import * as React from "react";
import AppLayout from "./views/AppLayout";
import BibleStudyView from "./views/WorkspaceView";
import AboutView from "./views/AboutView";

const routeMap = [
  {
    path: '/',
    component: AppLayout,
    indexRoute: {component: BibleStudyView},
    childRoutes: [
      {path: '/about', component: AboutView},
      {path: '*', component: AppLayout}
    ]
  }
  // <Route path="/" component={AppLayout}>
  //   <IndexRoute component={BibleStudyView}/>
  //   <Route path="/about" component={AboutView}/>
  //   <Route path="*" component={BibleStudyView} />
  // </Route>
];

export default routeMap;
