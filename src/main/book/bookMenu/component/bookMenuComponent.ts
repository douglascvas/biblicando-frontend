import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {BookMenu} from "../bookMenu";
import {Book} from "../../book";
import {AbstractMenuComponent} from "../../../common/abstractMenuComponent";
import {Menu} from "../../../common/menu";

@autoinject
@customElement('book-menu')
export class BookMenuComponent extends AbstractMenuComponent<Book> {
  @bindable menu:BookMenu;

  protected getMenu():Menu<Book> {
    return this.menu;
  }

  public formatMenuItem(book:Book):String {
    return `${book.number} - ${book.name}`;
  }

}