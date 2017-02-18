import {MenuBody} from "../../../menu/MenuBody";
import {Chapter} from "../../Chapter";
import {LoggerFactory} from "../../../common/logger/LoggerFactory";
import {MenuFilterFactory} from "../../../menu/MenuFilterFactory";

export class ChapterMenuBody extends MenuBody<Chapter> {
  constructor(_filterFactory: MenuFilterFactory, _loggerFactory: LoggerFactory) {
    super(_filterFactory.create(''), _loggerFactory.getLogger('ChapterMenuBody'));
  }

  protected itemsChanged(): any {
    this._logger.debug('List of chapters changed.');
    return super.itemsChanged();
  }
}
