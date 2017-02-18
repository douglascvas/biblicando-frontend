import {LoggerFactory} from "../common/logger/LoggerFactory";
import {Logger} from "../common/logger/Logger";

export class Main {
  private _logger: Logger;

  constructor(private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('Main');
  }

  public created(owningView, myView) {

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
