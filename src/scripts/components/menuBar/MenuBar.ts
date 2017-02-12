import {BookMenu} from "../book/bookMenu/BookMenu";
import {ChapterMenu} from "../chapter/chapterMenu/ChapterMenu";
import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Chapter} from "../chapter/Chapter";
import {Logger} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {BibleMenu} from "../bible/bibleMenu/BibleMenu";
import {StoreContainer} from "../common/StoreContainer";
import {ServiceContainer} from "../common/ServiceContainer";
import {SectionContext} from "../studySection/SectionContext";

export class MenuBar {
  public overlay: Overlay;
  public bibleMenu: BibleMenu;
  public bookMenu: BookMenu;
  public chapterMenu: ChapterMenu;
  private _logger: Logger;

  constructor(private _sectionContext: SectionContext,
              private _storeContainer: StoreContainer,
              private _serviceContainer: ServiceContainer) {

    this._logger = _serviceContainer.getLoggerFactory().getLogger('MenuBar');

    this.overlay = new Overlay();
    this.createBibleMenu();
    this.createBookMenu();
    this.createChapterMenu();

    // this.bibleMenu.onSelect(bible => this._bibleSelected(bible));
    // this.bookMenu.onSelect(book => this._bookSelected(book));
    // this.chapterMenu.onSelect(chapter => this._chapterSelected(chapter));
  }

  public hideAll() {
    this.bibleMenu.hide();
    // this.bookMenu.hide();
    // this.chapterMenu.hide();
  }

  public onBibleMenuToggle(callback: Function): Function {
    return this.bibleMenu.onToggle(callback);
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

  private createBibleMenu(): void {
    this.bibleMenu = new BibleMenu(this.overlay, this._sectionContext, this._serviceContainer);
  }

  private createBookMenu(): void {
    this.bookMenu = new BookMenu(this.overlay, this._sectionContext, this._serviceContainer);
  }

  private createChapterMenu(): void {
    this.chapterMenu = new ChapterMenu(this.overlay, this._sectionContext, this._serviceContainer);
  }
}
