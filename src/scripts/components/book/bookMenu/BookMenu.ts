import {AbstractMenu} from "../../menu/AbstractMenu";
import {Book} from "../Book";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {BookMenuBody} from "./menuBody/BookMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";
import KeyboardEvent = React.KeyboardEvent;

export class BookMenu extends AbstractMenu<Book> {
  private _search: Search;
  private _menuBody: MenuBody<Book>;

  private _unregisterFunctions: Function[];

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('BookMenu'));

    this._unregisterFunctions = [];
    this.createSearch();
    this.createItemList();

    this.onSelect(this.selectBook.bind(this));
  }

  public unregister() {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private selectBook(menuItem: MenuItem<Book>): void {
    this._sectionContext.setCurrentBook(menuItem.data);
  }

  protected createSearch(): void {
    this._search = new Search();
    const onQueryChangeUnregister = this._search.onQueryChange(this.searchChanged.bind(this));
    const onKeyPressUnregister = this._search.onKeyPress(this.searchKeyDown.bind(this));
    this._unregisterFunctions.push(onQueryChangeUnregister, onKeyPressUnregister);
  }

  protected createItemList(): void {
    this._menuBody = new BookMenuBody(this._serviceContainer);
    const onBooksChangeUnregister = this._sectionContext.onBooksChange(books => this.setMenuItems(books));
    this._unregisterFunctions.push(onBooksChangeUnregister);
    this.setMenuItems(this._sectionContext.books);
  }

  private setMenuItems(books: Book[]): Promise<void> {
    return this._menuBody.setItems(this.toMenuItems(books));
  }

  private toMenuItems(books: Book[]): MenuItem<Book>[] {
    return (books || []).map((book: Book) => this.bookToMenuItem(book));
  }

  private bookToMenuItem(book: Book): MenuItem<Book> {
    return new MenuItem(`${book.number} - ${book.name}`, book, this.selectItem.bind(this));
  }

  private searchChanged(query: string): Promise<void> {
    return this._menuBody.setFilter(new MenuFilter<Book>(query));
  }

  private searchKeyDown(event: KeyboardEvent<any>): Promise<void> {
    if (!event) {
      return null;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Book>[] = this._menuBody.getItems() || [];
      if (!items.length) {
        return null;
      }
      return items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Book> {
    return this._menuBody;
  }
}
