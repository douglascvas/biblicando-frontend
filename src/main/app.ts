import {Router, RouterConfiguration} from 'aurelia-router'

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'app/welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'app/users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'app/child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
