import {Overlay} from "../../menu/Overlay";
import {AbstractMenu} from "../../menu/AbstractMenu";
import {Bible} from "../../bible/Bible";
import {Book} from "../../book/Book";
import {Chapter} from "../../chapter/Chapter";
import {LoggerFactory} from "../../common/logger/LoggerFactory";
import {Factory} from "../../common/BasicFactory";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFactory} from "../../common/MenuFactory";
import {Logger} from "../../common/logger/Logger";

export class StudySectionMenu {
  public overlay: Overlay;
  public bibleMenu: AbstractMenu<Bible>;
  public bookMenu: AbstractMenu<Book>;
  public chapterMenu: AbstractMenu<Chapter>;
  private _logger: Logger;

  private _unregisterFunctions: Function[];

  constructor(_overlayFactory: Factory<Overlay>,
              private _bibleMenuFactory: MenuFactory<Bible>,
              private _bookMenuFactory: MenuFactory<Book>,
              private _chapterMenuFactory: MenuFactory<Chapter>,
              private _loggerFactory: LoggerFactory) {

    this._logger = _loggerFactory.getLogger('MenuBar');

    this._unregisterFunctions = [];
    this.overlay = _overlayFactory.create();
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
    this.bibleMenu = this._bibleMenuFactory.create(this.overlay);
    const onSelectUnsubscribe = this.bibleMenu.onSelect((menuItem: MenuItem<Bible>) => this._bibleSelected(menuItem));
    const onBeforeShowUnsubscribe = this.bibleMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.bibleMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }

  private createBookMenu(): void {
    this.bookMenu = this._bookMenuFactory.create(this.overlay);
    const onSelectUnsubscribe = this.bookMenu.onSelect((menuItem: MenuItem<Book>) => this._bookSelected(menuItem));
    const onBeforeShowUnsubscribe = this.bookMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.bookMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }

  private createChapterMenu(): void {
    this.chapterMenu = this._chapterMenuFactory.create(this.overlay);
    const onSelectUnsubscribe = this.chapterMenu.onSelect((menuItem: MenuItem<number>) => this._chapterSelected(menuItem));
    const onBeforeShowUnsubscribe = this.chapterMenu.onBeforeShow(() => this.hideAll());
    this._unregisterFunctions.push(() => this.chapterMenu.unregister(), onSelectUnsubscribe, onBeforeShowUnsubscribe);
  }
}
