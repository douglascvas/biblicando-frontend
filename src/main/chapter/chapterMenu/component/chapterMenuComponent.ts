import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {BookMenu} from "../../../book/bookMenu/bookMenu";
import {Logger, LoggerFactory} from "../../../common/loggerFactory";
import {Book} from "../../../book/book";

@autoinject
@customElement('chapter-menu')
export class ChapterMenuComponent {
  @bindable menu:BookMenu;
  private _logger:Logger;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterMenuComponent');
  }

  public selectItem(item):void {
    this.menu.selectItem(item);
  }

  public formatMenuItem(book:Book):String {
    return book.name;
  }
}