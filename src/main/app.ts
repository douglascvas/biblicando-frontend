import {bindable} from "aurelia-templating";
export class App {
  @bindable router = null;

  public configure(aurelia) {
    console.log(aurelia);
  }

  public configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: './app/welcome', nav: true, title: 'Welcome'},
      {route: 'users', name: 'users', moduleId: './app/users', nav: true, title: 'Github Users'},
      {route: 'child-router', name: 'child-router', moduleId: './app/child-router', nav: true, title: 'Child Router'}
    ]);

    this.router = router;
  }
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources('global/innerText')
    .developmentLogging();

  aurelia.start().then(() => aurelia.setRoot());
  console.log(aurelia);
}
