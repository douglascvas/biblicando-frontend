import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {Logger, LoggerFactory} from "../../../common/loggerFactory";
import {ChapterMenu} from "../chapterMenu";
import {Chapter} from "../../chapter";

@autoinject
@customElement('chapter-menu')
export class ChapterMenuComponent {
  @bindable menu:ChapterMenu;
  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterMenuComponent');
  }

  public selectItem(item):void {
    this.menu.selectItem(item);
  }

  public formatMenuItem(chapter:Chapter):String {
    return (chapter.number || 1).toString();
  }
}