import {autoinject} from "aurelia-dependency-injection";
import {customElement, bindable} from "aurelia-templating";
import {MenuBar} from "../menuBar";
import {Logger, LoggerFactory} from "../../common/loggerFactory";

@autoinject
@customElement('menu-bar')
export class MenuBarComponent {
  @bindable menuBar:MenuBar;
  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('MenuBarComponent');
  }

  public created() {
    this._logger.debug('Created menu bar with', this.menuBar);
  }

  public menuBarChanged(newValue, oldValue){
    this._logger.debug('Updated menu bar with', this.menuBar);
  }
}