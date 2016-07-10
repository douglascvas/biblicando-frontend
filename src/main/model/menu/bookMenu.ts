import {Menu} from "./menu";

export class BookMenu extends Menu {
  constructor() {
    super(this.filterBooks);
  }

  private filterBooks(books:any[], filter:string):any[] {
    return (books || [])
      .filter(book=>book.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }
}