import {Menu} from "../../common/menu";
import {Book} from "../book";
import {LoggerFactory} from "../../common/loggerFactory";
import {Overlay} from "../../common/overlay";

export class BookMenu extends Menu<Book> {
  constructor(_overlay:Overlay,
              _loggerFactory:LoggerFactory) {
    super(_overlay, _loggerFactory.getLogger('BookMenu'));
  }

  public filterItems(filterValue:string):any[] {
    return (this.items || [])
      .filter(book=>book.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
  }
}