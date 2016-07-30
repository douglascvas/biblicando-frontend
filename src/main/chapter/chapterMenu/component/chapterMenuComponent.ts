import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {Logger, LoggerFactory} from "../../../common/loggerFactory";
import {ChapterMenu} from "../chapterMenu";
import {Chapter} from "../../chapter";
import {AbstractMenuComponent} from "../../../common/abstractMenuComponent";
import {Menu} from "../../../common/menu";

@autoinject
@customElement('chapter-menu')
export class ChapterMenuComponent extends AbstractMenuComponent {
  @bindable menu:ChapterMenu;
  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterMenuComponent');
  }

  protected getMenu():Menu {
    return this.menu;
  }

  public formatMenuItem(chapter:Chapter):String {
    return (chapter.number || 1).toString();
  }
}