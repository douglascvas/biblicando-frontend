import {Menu} from "../../menu/Menu";
import {Book} from "../Book";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {BookMenuBody} from "./menuBody/BookMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";

export class BookMenu extends Menu<Book> {
  private _search: Search;
  private _menuBody: MenuBody<Book>;

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('BookMenu'));

    this.createSearch();
    this.createItemList();
  }

  protected createSearch(): void {
    this._search = new Search();
    this._search.onQueryChange(this.searchChanged.bind(this));
    this._search.onKeyPress(this.searchKeyDown.bind(this));
  }

  protected createItemList(): void {
    this._menuBody = new BookMenuBody(this._serviceContainer);
    this._sectionContext.onBooksChange(books => this.setMenuItems(books));
    this.setMenuItems(this._sectionContext.books);
  }

  private setMenuItems(books: Book[]) {
    this._menuBody.setItems(this.toMenuItems(books));
  }

  private toMenuItems(books: Book[]): MenuItem<Book>[] {
    return (books || []).map((book: Book) => this.bookToMenuItem(book));
  }

  private bookToMenuItem(book: Book): MenuItem<Book> {
    return new MenuItem(`${book.number} - ${book.name}`, book, this.selectItem.bind(this));
  }

  private searchChanged(query: string): void {
    this._menuBody.setFilter(new MenuFilter<Book>(query));
  }

  private searchKeyDown(event): void {
    if (!event) {
      return;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Book>[] = this._menuBody.getItems() || [];
      if (!items.length) {
        return;
      }
      items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Book> {
    return this._menuBody;
  }
}
