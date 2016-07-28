import {customElement, bindable} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {BiblePage} from "../biblePage";
import {LoggerFactory, Logger} from "../../../common/loggerFactory";

@autoinject()
@customElement('bible-page')
export class BiblePageComponent {
  @bindable page:BiblePage;

  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('MenuBarComponent');
  }

  public created() {
    this._logger.debug('Created bible page with', this.page);
  }

  public pageChanged(newValue, oldValue){
    this._logger.debug('Updated bible page with', this.page);
  }
}