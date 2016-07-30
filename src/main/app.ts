import {bindable} from "aurelia-templating";

export class App {
  @bindable router = null;

  public configure(aurelia) {
    console.log(aurelia);
  }

  public configureRouter(config, router) {
    config.title = 'Biblicando';
    config.map([
      {route: ['', 'main'], name: 'main', moduleId: './main/main', nav: true, title: ''},
      {route: 'users', name: 'users', moduleId: './app/users', nav: true, title: 'Github Users'},
      {route: 'child-router', name: 'child-router', moduleId: './app/child-router', nav: true, title: 'Child Router'}
    ]);

    this.router = router;
  }
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(() => aurelia.setRoot());
  console.log(aurelia);
}
