import {View} from "aurelia-templating";
import {LoggerFactory, Logger} from "../common/loggerFactory";
import {autoinject} from "aurelia-dependency-injection";

@autoinject()
export class Main {
  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('Main');
  }

  public created(owningView:View, myView:View) {

  }

  // //Getters can't be directly observed, so they must be dirty checked.
  // //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  // //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  // //as well as the corresponding import above.
  // //@computedFrom('firstName', 'lastName')
  // get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }

  canDeactivate() {
    this._logger.debug('Leaving page');
    //   return confirm('Are you sure you want to leave?');
  }
}

// export class UpperValueConverter {
//   toView(value:any) {
//     return value && value.toUpperCase();
//   }
// }
