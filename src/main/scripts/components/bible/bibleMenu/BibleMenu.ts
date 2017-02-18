import {AbstractMenu} from "../../menu/AbstractMenu";
import {Bible} from "../Bible";
import {Overlay} from "../../menu/Overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {MenuItem} from "../../menu/MenuItem";
import {SectionContext} from "../../studySection/SectionContext";
import {LoggerFactory} from "../../common/logger/LoggerFactory";
import {Factory} from "../../common/BasicFactory";
import {MenuFilterFactory} from "../../menu/MenuFilterFactory";
import {BibleMenuBody} from "./menuBody/BibleMenuBody";
import {MenuItemFactory} from "../../menu/MenuItemFactory";

export class BibleMenu extends AbstractMenu<Bible> {
  private _search: Search;
  private _menuBody: MenuBody<Bible>;

  private _unregisterFunctions: Function[];

  public constructor(_overlay: Overlay,
                     private _menuItemFactory: MenuItemFactory,
                     private _searchFactory: Factory<Search>,
                     private _menuFilterFactory: MenuFilterFactory,
                     private _bibleMenuBodyFactory: Factory<BibleMenuBody>,
                     private _sectionContext: SectionContext,
                     private _loggerFactory: LoggerFactory) {
    super(_overlay, _loggerFactory.getLogger('BibleMenu'));

    this._unregisterFunctions = [];
    this.createSearch();
    this.createItemList();

    this.onSelect(this.selectBible.bind(this));

    this.onShow(() => this._logger.debug("Bible menu opened"));
    this.onHide(() => this._logger.debug("Bible menu closed"));
  }

  public unregister(): void {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private selectBible(menuItem: MenuItem<Bible>): void {
    this._sectionContext.setCurrentBible(menuItem.data);
  }

  protected createSearch(): void {
    this._search = this._searchFactory.create();
    const onQueryChangeUnregister = this._search.onQueryChange(this.searchChanged.bind(this));
    const onKeyPressUnregister = this._search.onKeyPress(this.searchKeyDown.bind(this));
    this._unregisterFunctions.push(onQueryChangeUnregister, onKeyPressUnregister);
  }

  protected createItemList(): Promise<void> {
    this._menuBody = this._bibleMenuBodyFactory.create();
    const onBiblesChangeUnregister = this._sectionContext.onBiblesChange(bibles => this.setMenuItems(bibles));
    this._unregisterFunctions.push(onBiblesChangeUnregister);
    return this.setMenuItems(this._sectionContext.bibles);
  }

  private setMenuItems(bibles: Bible[]): Promise<void> {
    return this._menuBody.setItems(this.toMenuItems(bibles));
  }

  private toMenuItems(bibles: Bible[]): MenuItem<Bible>[] {
    return (bibles || []).map((bible: Bible) => this.bibleToMenuItem(bible));
  }

  private bibleToMenuItem(bible: Bible): MenuItem<Bible> {
    return this._menuItemFactory.create(`${bible.languageCode} - ${bible.name}`, bible, this.selectItem.bind(this));
  }

  private searchChanged(query: string): Promise<void> {
    return this._menuBody.setFilter(this._menuFilterFactory.create(query));
  }

  private searchKeyDown(event): Promise<void> {
    if (!event) {
      return null;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Bible>[] = this._menuBody.getItems() || [];
      if (!items.length) {
        return null;
      }
      return items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Bible> {
    return this._menuBody;
  }
}
