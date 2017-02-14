import {BookMenu} from "../book/bookMenu/BookMenu";
import {ChapterMenu} from "../chapter/chapterMenu/ChapterMenu";
import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Logger} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {BibleMenu} from "../bible/bibleMenu/BibleMenu";
import {ServiceContainer} from "../common/ServiceContainer";
import {SectionContext} from "../studySection/SectionContext";
import {MenuItem} from "../menu/MenuItem";

export class StudySectionMenu {
  public overlay: Overlay;
  public bibleMenu: BibleMenu;
  public bookMenu: BookMenu;
  public chapterMenu: ChapterMenu;
  private _logger: Logger;

  private _unregisterFunctions: Function[];

  constructor(private _sectionContext: SectionContext,
              private _serviceContainer: ServiceContainer) {

    this._logger = _serviceContainer.getLoggerFactory().getLogger('MenuBar');

    this._unregisterFunctions = [];
    this.overlay = new Overlay();
    this.createBibleMenu();
    this.createBookMenu();
    this.createChapterMenu();
  }

  public unregister(): void {
    this._unregisterFunctions.forEach(fn => fn());
  }

  public async hideAll(): Promise<void> {
    await this.bibleMenu.hide();
    await this.bookMenu.hide();
    await this.chapterMenu.hide();
  }

  public onBibleMenuToggle(callback: Function): Function {
    return this.bibleMenu.onToggle(callback);
  }

  public onBookMenuToggle(callback: Function): Function {
    return this.bookMenu.onToggle(callback);
  }

  public onChapterMenuToggle(callback: Function): Function {
    return this.chapterMenu.onToggle(callback);
  }

  private _bibleSelected(menuItem: MenuItem<Bible>): Promise<void> {
    return this.hideAll();
  }

  private _bookSelected(menuItem: MenuItem<Book>): Promise<void> {
    return this.hideAll();
  }

  private _chapterSelected(menuItem: MenuItem<number>): Promise<void> {
    return this.hideAll();
  }

  public bibleMenuButtonClicked(): Promise<void> {
    return this.bibleMenu.toggle();
  }

  public bookMenuButtonClicked(): Promise<void> {
    return this.bookMenu.toggle();
  }

  public chapterMenuButtonClicked(): Promise<void> {
    return this.chapterMenu.toggle();
  }

  public isOverlayVisible() {
    return this.overlay.visible;
  }

  private createBibleMenu(): void {
    this.bibleMenu = new BibleMenu(this.overlay, this._sectionContext, this._serviceContainer);
    const onSelectUnsubscribe = this.bibleMenu.onSelect((menuItem: MenuItem<Bible>) => this._bibleSelected(menuItem));
    const onBeforeShowUnsubscribe = this.bibleMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.bibleMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }

  private createBookMenu(): void {
    this.bookMenu = new BookMenu(this.overlay, this._sectionContext, this._serviceContainer);
    const onSelectUnsubscribe = this.bookMenu.onSelect((menuItem: MenuItem<Book>) => this._bookSelected(menuItem));
    const onBeforeShowUnsubscribe = this.bookMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.bookMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }

  private createChapterMenu(): void {
    this.chapterMenu = new ChapterMenu(this.overlay, this._sectionContext, this._serviceContainer);
    const onSelectUnsubscribe = this.chapterMenu.onSelect((menuItem: MenuItem<number>) => this._chapterSelected(menuItem));
    const onBeforeShowUnsubscribe = this.chapterMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.chapterMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }
}
