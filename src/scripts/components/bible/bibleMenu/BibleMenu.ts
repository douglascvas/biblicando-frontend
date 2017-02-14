import {AbstractMenu} from "../../menu/AbstractMenu";
import {Bible} from "../Bible";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {BibleMenuBody} from "./menuBody/BibleMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";

export class BibleMenu extends AbstractMenu<Bible> {
  private _search: Search;
  private _menuBody: MenuBody<Bible>;

  private _unregisterFunctions: Function[];

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('BibleMenu'));

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
    this._search = new Search();
    const onQueryChangeUnregister = this._search.onQueryChange(this.searchChanged.bind(this));
    const onKeyPressUnregister = this._search.onKeyPress(this.searchKeyDown.bind(this));
    this._unregisterFunctions.push(onQueryChangeUnregister, onKeyPressUnregister);
  }

  protected createItemList(): Promise<void> {
    this._menuBody = new BibleMenuBody(this._serviceContainer);
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
    return new MenuItem(`${bible.languageCode} - ${bible.name}`, bible, this.selectItem.bind(this));
  }

  private searchChanged(query: string): Promise<void> {
    return this._menuBody.setFilter(new MenuFilter<Bible>(query));
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
