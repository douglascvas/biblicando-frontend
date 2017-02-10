import {Menu} from "../../menu/Menu";
import {Overlay} from "../../common/overlay";
import ChapterFilter from "../ChapterFilter";
import {ItemList} from "../../common/ItemList";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {Chapter} from "../chapter";

export class ChapterMenu extends Menu<Chapter> {
  private filter: ChapterFilter;

  public constructor(_overlay: Overlay,
                     _search: Search,
                     _itemList: ItemList<Chapter>,
                     _serviceContainer: ServiceContainer) {
    super(_overlay, _search, _itemList, _serviceContainer.getLoggerFactory().getLogger('ChapterMenu'));

    _search.onQueryChange(query => this.searchQueryChange(query));
    _search.onKeyPress(event => this.searchKeyPress(event));
  }

  private searchQueryChange(query: string): void {
    this.filter = new ChapterFilter(query);
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
