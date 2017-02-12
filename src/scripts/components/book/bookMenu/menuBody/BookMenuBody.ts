import {Book} from "../../Book";
import {MenuFilter} from "../../../menu/MenuFilter";
import {MenuBody} from "../../../menu/MenuBody";
import {ServiceContainer} from "../../../common/ServiceContainer";

export class BookMenuBody extends MenuBody<Book> {
  constructor(_serviceContainer: ServiceContainer,
              _filter?: MenuFilter<Book>) {
    super(_serviceContainer.getLoggerFactory().getLogger('BookMenuBody'), _filter);
  }

  protected itemsChanged(): any {
    this._logger.debug('List of books changed.');
    return super.itemsChanged();
  }
}
