import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {BookMenu} from "../bookMenu";
import {Logger, LoggerFactory} from "../../../common/loggerFactory";
import {Book} from "../../book";

@autoinject
@customElement('book-menu')
export class BookMenuComponent {
  private _logger:Logger;

  @bindable menu:BookMenu;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('BookMenuComponent');
  }

  public selectItem(item):void {
    this.menu.selectItem(item);
  }

  public formatMenuItem(book:Book):String {
    return `${book.number} - ${book.name}`;
  }

}