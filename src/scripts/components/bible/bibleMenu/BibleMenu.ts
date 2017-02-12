import {Menu} from "../../menu/Menu";
import {Bible} from "../Bible";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {BibleMenuBody} from "./menuBody/BibleMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";

export class BibleMenu extends Menu<Bible> {
  private _search: Search;
  private _menuBody: MenuBody<Bible>;

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('BibleMenu'));

    this.createSearch();
    this.createItemList();
  }

  protected createSearch(): void {
    this._search = new Search();
    this._search.onQueryChange(this.searchChanged.bind(this));
    this._search.onKeyPress(this.searchKeyDown.bind(this));
  }

  protected createItemList(): void {
    this._menuBody = new BibleMenuBody(this._serviceContainer);
    this._sectionContext.onBiblesChange(bibles => this.setMenuItems(bibles));
    this.setMenuItems(this._sectionContext.bibles);
  }

  private setMenuItems(bibles: Bible[]) {
    this._menuBody.setItems(this.toMenuItems(bibles));
  }

  private toMenuItems(bibles: Bible[]): MenuItem<Bible>[] {
    return (bibles || []).map((bible: Bible) => this.bibleToMenuItem(bible));
  }

  private bibleToMenuItem(bible: Bible): MenuItem<Bible> {
    return new MenuItem(`${bible.languageCode} - ${bible.name}`, bible, this.selectItem.bind(this));
  }

  private searchChanged(query: string): void {
    this._menuBody.setFilter(new MenuFilter<Bible>(query));
  }

  private searchKeyDown(event): void {
    if (!event) {
      return;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Bible>[] = this._menuBody.getItems() || [];
      if (!items.length) {
        return;
      }
      items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Bible> {
    return this._menuBody;
  }
}
