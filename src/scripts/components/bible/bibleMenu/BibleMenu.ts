import {Menu} from "../../menu/Menu";
import {Bible} from "../Bible";
import {Overlay} from "../../common/overlay";
import BibleFilter from "../BibleFilter";
import {ItemList} from "../../common/ItemList";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";

export class BibleMenu extends Menu<Bible> {
  private filter: BibleFilter;

  public constructor(_overlay: Overlay,
                     _search: Search,
                     _itemList: ItemList<Bible>,
                     _serviceContainer: ServiceContainer) {
    super(_overlay, _search, _itemList, _serviceContainer.getLoggerFactory().getLogger('BibleMenu'));

    _search.onQueryChange(query => this.searchQueryChange(query));
    _search.onKeyPress(event => this.searchKeyPress(event));
  }

  private searchQueryChange(query: string): void {
    this.filter = new BibleFilter(query);
    this._itemList.changeFilter(this.filter);
  }

  private searchKeyPress(event) {
    if (!event || event.keyCode !== 13) {
      return true;
    }
    const items = this._itemList.getItems();
    const selectedItem = items[0];
    if (selectedItem) {
      this.selectItem(selectedItem);
    }
  }
}
