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
  public _menus: AbstractMenu<any>[];
  private _logger: Logger;

  private _unregisterFunctions: Function[];

  constructor(_overlayFactory: Factory<Overlay>,
              private _bibleMenuFactory: MenuFactory<Bible>,
              private _bookMenuFactory: MenuFactory<Book>,
              private _chapterMenuFactory: MenuFactory<Chapter>,
              private _loggerFactory: LoggerFactory) {

    this._logger = _loggerFactory.getLogger('MenuBar');

    this._menus = [];
    this._unregisterFunctions = [];
    this.overlay = _overlayFactory.create();
    this.createMenus();
  }

  public unregister(): void {
    this._unregisterFunctions.forEach(fn => fn());
  }

  public onMenuToggle(callback: Function): Function {
    const onMenuToggleUnsubscribe: Function[] = this._menus.map(menu => menu.onToggle(callback));
    return () => onMenuToggleUnsubscribe.forEach(fn => fn());
  }

  public overlayClicked(): Promise<void> {
    return this.hideAll()
  }

  public async menuButtonClicked(menu: AbstractMenu<any>): Promise<void> {
    await this.hideAll(menu);
    return menu.toggle();
  }

  public isOverlayVisible() {
    return this.overlay.visible;
  }

  private async hideAll(currentMenu?: AbstractMenu<any>): Promise<void> {
    const promises = this._menus
      .filter(menu => menu !== currentMenu)
      .map(menu => menu.hide());
    await Promise.all(promises);
  }

  private menuItemSelected(menu: AbstractMenu<any>, menuItem: MenuItem<any>): Promise<void> {
    return menu.hide();
  }

  private createMenus(): void {
    this._menus.push(this.bibleMenu = this._bibleMenuFactory.create(this.overlay));
    this._menus.push(this.bookMenu = this._bookMenuFactory.create(this.overlay));
    this._menus.push(this.chapterMenu = this._chapterMenuFactory.create(this.overlay));

    const onSelectUnsubscribe: Function[] = this._menus.map(menu => menu.onSelect(menuItem => this.menuItemSelected(menu, menuItem)));
    this._unregisterFunctions = [...this._unregisterFunctions, ...onSelectUnsubscribe];
  }
}
