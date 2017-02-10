import {Bible} from "../Bible";
import {Store} from "../../common/Store";
import {Filter} from "../../common/filter/Filter";
import {ItemList} from "../../common/ItemList";
import {ServiceContainer} from "../../common/ServiceContainer";

export class BibleList extends ItemList<Bible> {
  constructor(_itemStore: Store<Bible[]>,
              _serviceContainer: ServiceContainer,
              _filter?: Filter<Bible>) {
    super(_itemStore, _serviceContainer.getLoggerFactory().getLogger('BibleList'), _filter);
  }
}
