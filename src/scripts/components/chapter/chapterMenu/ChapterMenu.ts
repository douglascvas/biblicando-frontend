import {AbstractMenu} from "../../menu/AbstractMenu";
import {Chapter} from "../Chapter";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {ChapterMenuBody} from "./menuBody/ChapterMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";

export class ChapterMenu extends AbstractMenu<Chapter> {
  private _search: Search;
  private _menuBody: MenuBody<Chapter>;

  private _unregisterFunctions: Function[];

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('ChapterMenu'));

    this._unregisterFunctions = [];
    this.createSearch();
    this.createItemList();

    this.onSelect(this.selectChapter.bind(this));
  }

  public unregister(): void {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private selectChapter(menuItem: MenuItem<Chapter>): Promise<void> {
    return this._sectionContext.setCurrentChapter(menuItem.data);
  }

  private createSearch(): void {
    this._search = new Search();
    const onQueryChangeUnregister = this._search.onQueryChange(this.searchChanged.bind(this));
    const onKeyPressUnregister = this._search.onKeyPress(this.searchKeyDown.bind(this));
    this._unregisterFunctions.push(onQueryChangeUnregister, onKeyPressUnregister);
  }

  private createItemList(): void {
    this._menuBody = new ChapterMenuBody(this._serviceContainer);
    const onChaptersChangeUnregister = this._sectionContext.onChaptersChange(chapters => this.setMenuItems(chapters));
    this._unregisterFunctions.push(onChaptersChangeUnregister);
    this.setMenuItems(this._sectionContext.chapters);
  }

  private setMenuItems(chapters: Chapter[]): Promise<void> {
    return this._menuBody.setItems(this.toMenuItems(chapters));
  }

  private toMenuItems(chapters: Chapter[]): MenuItem<Chapter>[] {
    return (chapters || []).map((chapter: Chapter) => this.chapterToMenuItem(chapter));
  }

  private chapterToMenuItem(chapter: Chapter): MenuItem<Chapter> {
    return new MenuItem(`${chapter.number}`, chapter, this.selectItem.bind(this));
  }

  private searchChanged(query: string): Promise<void> {
    return this._menuBody.setFilter(new MenuFilter<Chapter>(query));
  }

  private searchKeyDown(event): Promise<void> {
    if (!event) {
      return;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Chapter>[] = this._menuBody.getItems() || [];
      return items.length && items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Chapter> {
    return this._menuBody;
  }
}
