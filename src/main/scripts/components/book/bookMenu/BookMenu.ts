import {AbstractMenu} from "../../menu/AbstractMenu";
import {Book} from "../Book";
import {Overlay} from "../../menu/Overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {MenuItem} from "../../menu/MenuItem";
import {SectionContext} from "../../studySection/SectionContext";
import {Factory} from "../../common/BasicFactory";
import {LoggerFactory} from "../../common/LoggerFactory";
import {MenuFilterFactory} from "../../menu/MenuFilterFactory";
import KeyboardEvent = React.KeyboardEvent;

export class BookMenu extends AbstractMenu<Book> {
  private _search: Search;
  private _menuBody: MenuBody<Book>;
  private _unregisterFunctions: Function[];

  public constructor(_overlay: Overlay,
                     private _menuFilterFactory: MenuFilterFactory,
                     private _bookMenuBodyFactory: Factory<MenuBody<Book>>,
                     private _sectionContext: SectionContext,
                     private _loggerFactory: LoggerFactory) {
    super(_overlay, _loggerFactory.getLogger('BookMenu'));

    this._unregisterFunctions = [];
    this.createSearch();
    this.createItemList();

    this.onSelect(this.selectBook.bind(this));

    this.onShow(() => this._logger.debug("Book menu opened"));
    this.onHide(() => this._logger.debug("Book menu closed"));
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
    this._menuBody = this._bookMenuBodyFactory.create();
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
    return this._menuBody.setFilter(this._menuFilterFactory.create(query));
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
