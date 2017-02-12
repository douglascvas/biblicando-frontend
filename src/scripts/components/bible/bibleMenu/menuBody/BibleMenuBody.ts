import {Bible} from "../../Bible";
import {MenuFilter} from "../../../menu/MenuFilter";
import {MenuBody} from "../../../menu/MenuBody";
import {ServiceContainer} from "../../../common/ServiceContainer";

export class BibleMenuBody extends MenuBody<Bible> {
  constructor(_serviceContainer: ServiceContainer,
              _filter?: MenuFilter<Bible>) {
    super(_serviceContainer.getLoggerFactory().getLogger('BibleMenuBody'), _filter);
  }

  protected itemsChanged(): any {
    this._logger.debug('List of bibles changed.');
    return super.itemsChanged();
  }
}
