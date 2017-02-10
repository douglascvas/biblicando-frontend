import {Menu} from "../../menu/Menu";
import {Book} from "../book";
import {LoggerFactory} from "../../common/loggerFactory";
import {Overlay} from "../../common/overlay";
import {Search} from "../../search/Search";
import {ItemList} from "../../common/ItemList";
import BookFilter from "../BookFilter";

export class BookMenu extends Menu<Book> {
  private filter: BookFilter;

  public constructor(_overlay: Overlay,
                     _search: Search,
                     _itemList: ItemList<Book>,
                     _loggerFactory: LoggerFactory) {
    super(_overlay, _search, _itemList, _loggerFactory.getLogger('BookMenu'));

    _search.onQueryChange(query => this.searchQueryChange(query));
    _search.onKeyPress(event => this.searchKeyPress(event));
  }

  private searchQueryChange(query: string): void {
    this.filter = new BookFilter(query);
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
