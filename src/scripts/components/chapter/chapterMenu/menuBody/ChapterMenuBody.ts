import {MenuFilter} from "../../../menu/MenuFilter";
import {MenuBody} from "../../../menu/MenuBody";
import {ServiceContainer} from "../../../common/ServiceContainer";
import {Chapter} from "../../Chapter";

export class ChapterMenuBody extends MenuBody<Chapter> {
  constructor(_serviceContainer: ServiceContainer,
              _filter?: MenuFilter<Chapter>) {
    super(_serviceContainer.getLoggerFactory().getLogger('ChapterMenuBody'), _filter);
  }

  protected itemsChanged(): any {
    this._logger.debug('List of chapters changed.');
    return super.itemsChanged();
  }
}
