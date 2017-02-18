import {Bible} from "../../Bible";
import {MenuBody} from "../../../menu/MenuBody";
import {LoggerFactory} from "../../../common/logger/LoggerFactory";
import {MenuFilterFactory} from "../../../menu/MenuFilterFactory";

export class BibleMenuBody extends MenuBody<Bible> {
  constructor(_menuFilterFactory: MenuFilterFactory,
              _loggerFactory: LoggerFactory) {
    super(_menuFilterFactory.create(''), _loggerFactory.getLogger('BibleMenuBody'));
  }

  protected itemsChanged(): any {
    this._logger.debug('List of bibles changed.');
    return super.itemsChanged();
  }
}
