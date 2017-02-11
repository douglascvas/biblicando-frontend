import {Filter} from "../common/filter/Filter";
import {Book} from "./Book";

export default class BookFilter extends Filter<Book> {
  constructor(query: string) {
    super(query);
  }

  public filter(items: Book[]): Book[] {
    items = items || [];
    return items.filter(book => book.name.toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
  }
}
