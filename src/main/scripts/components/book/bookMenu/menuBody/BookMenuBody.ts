import {Book} from "../../Book";
import {MenuBody} from "../../../menu/MenuBody";
import {MenuFilterFactory} from "../../../menu/MenuFilterFactory";
import {LoggerFactory} from "../../../common/logger/LoggerFactory";

export class BookMenuBody extends MenuBody<Book> {
  constructor(_menuFilterFactory: MenuFilterFactory,
              _loggerFactory: LoggerFactory) {
    super(_menuFilterFactory.create(''), _loggerFactory.getLogger('BookMenuBody'));
  }

  protected itemsChanged(): any {
    this._logger.debug('List of books changed.');
    return super.itemsChanged();
  }
}
