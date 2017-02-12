import {Menu} from "../../menu/Menu";
import {Chapter} from "../Chapter";
import {Overlay} from "../../common/overlay";
import {MenuBody} from "../../menu/MenuBody";
import {Search} from "../../search/Search";
import {ServiceContainer} from "../../common/ServiceContainer";
import {ChapterMenuBody} from "./menuBody/ChapterMenuBody";
import {MenuItem} from "../../menu/MenuItem";
import {MenuFilter} from "../../menu/MenuFilter";
import {SectionContext} from "../../studySection/SectionContext";

export class ChapterMenu extends Menu<Chapter> {
  private _search: Search;
  private _menuBody: MenuBody<Chapter>;

  public constructor(_overlay: Overlay,
                     private _sectionContext: SectionContext,
                     private _serviceContainer: ServiceContainer) {
    super(_overlay, _serviceContainer.getLoggerFactory().getLogger('ChapterMenu'));

    this.createSearch();
    this.createItemList();
  }

  protected createSearch(): void {
    this._search = new Search();
    this._search.onQueryChange(this.searchChanged.bind(this));
    this._search.onKeyPress(this.searchKeyDown.bind(this));
  }

  protected createItemList(): void {
    this._menuBody = new ChapterMenuBody(this._serviceContainer);
    this._sectionContext.onChaptersChange(chapters => this.setMenuItems(chapters));
    this.setMenuItems(this._sectionContext.chapters);
  }

  private setMenuItems(chapters: Chapter[]) {
    this._menuBody.setItems(this.toMenuItems(chapters));
  }

  private toMenuItems(chapters: Chapter[]): MenuItem<Chapter>[] {
    return (chapters || []).map((chapter: Chapter) => this.chapterToMenuItem(chapter));
  }

  private chapterToMenuItem(chapter: Chapter): MenuItem<Chapter> {
    return new MenuItem(`${chapter.number}`, chapter, this.selectItem.bind(this));
  }

  private searchChanged(query: string): void {
    this._menuBody.setFilter(new MenuFilter<Chapter>(query));
  }

  private searchKeyDown(event): void {
    if (!event) {
      return;
    } else if (event.keyCode === 27) {
      // ESCAPE
      return this.hide();
    } else if (event.keyCode === 13) {
      // ENTER
      const items: MenuItem<Chapter>[] = this._menuBody.getItems() || [];
      if (!items.length) {
        return;
      }
      items[0].select();
    }
  }

  get search(): Search {
    return this._search;
  }

  get menuBody(): MenuBody<Chapter> {
    return this._menuBody;
  }
}
