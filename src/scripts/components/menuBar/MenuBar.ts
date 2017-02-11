import {BookMenu} from "../book/bookMenu/bookMenu";
import {ChapterMenu} from "../chapter/chapterMenu/chapterMenu";
import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Chapter} from "../chapter/chapter";
import {Logger, LoggerFactory} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {Search} from "../search/Search";
import {BibleList} from "../bible/bibleList/BibleList";
import {Store} from "../common/Store";
import {ItemList} from "../common/ItemList";
import {BibleMenu} from "../bible/bibleMenu/BibleMenu";
import {StoreContainer} from "../common/StoreContainer";
import {ServiceContainer} from "../common/ServiceContainer";

export class MenuBar {
  public overlay: Overlay;
  public bibleMenu: BibleMenu;
  public bookMenu: BookMenu;
  public chapterMenu: ChapterMenu;
  private _logger: Logger;

  constructor(_storeContainer: StoreContainer,
              _serviceContainer: ServiceContainer) {

    this._logger = _serviceContainer.getLoggerFactory().getLogger('MenuBar');

    this.overlay = new Overlay();
    this.bibleMenu = this.createBibleMenu(this.overlay, _storeContainer.getBibleStore(), _serviceContainer);
    // this.bookMenu = new BookMenu(this.overlay, this._loggerFactory);
    // this.chapterMenu = new ChapterMenu(this.overlay, this._loggerFactory);

    this.bibleMenu.onSelect(bible => this._bibleSelected(bible));
    // this.bookMenu.onSelect(book => this._bookSelected(book));
    // this.chapterMenu.onSelect(chapter => this._chapterSelected(chapter));
  }

  public hideAll() {
    this.bibleMenu.hide();
    this.bookMenu.hide();
    this.chapterMenu.hide();
  }

  private _bibleSelected(bible: Bible) {
    this.hideAll();
  }

  private _bookSelected(book: Book) {
    this.hideAll();
  }

  private _chapterSelected(chapter: Chapter) {
    this.hideAll();
  }

  public bibleMenuButtonClicked(): void {
    this.bibleMenu.toggle();
  }

  public bookMenuButtonClicked(): void {
    this.bookMenu.toggle();
  }

  public chapterMenuButtonClicked(): void {
    this.chapterMenu.toggle();
  }

  public onBibleSelect(listener: (Bible) => void) {
    return this.bibleMenu.onSelect(listener);
  }

  public onBookSelect(listener: (Book) => void) {
    // return this.bookMenu.onSelect(listener);
  }

  public onChapterSelect(listener: (Chapter) => void) {
    // return this.chapterMenu.onSelect(listener);
  }

  public isOverlayVisible() {
    return this.overlay.visible;
  }

  private createBibleMenu(overlay: Overlay, bibleStore: Store<Bible>, serviceContainer: ServiceContainer) {
    const search: Search = new Search();
    const bibleList: ItemList<Bible> = new BibleList(bibleStore, serviceContainer);
    return new BibleMenu(overlay, search, bibleList, serviceContainer);
  }

  private createBookMenu(overlay: Overlay, bookStore: Store<Book[]>, loggerFactory: LoggerFactory) {
    // const search: Search = new Search();
    // const bookList: ItemList<Book> = new BookList(bookStore, loggerFactory);
    // return new BookMenu(overlay, search, bookList, loggerFactory);
  }
}
