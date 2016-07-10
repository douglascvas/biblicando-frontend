import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";
import {KeyValue} from "../dropdownMenu/dropdownMenu";

@inject(HttpClient)
@customElement('book-list')
export class BookList {
  @bindable books:any[];
  @bindable onselect:Function;
  filteredBooks:any[];
  menuItems:KeyValue[];
  filter:String;

  constructor(private httpClient:HttpClient) {
    console.log("Book list started.");
  }

  private filterBooks(bibles) {
    var self = this;
    self.filteredBooks = (bibles || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0);
    return true;
  }

  public filterChanged(newValue, oldValue) {
    console.log('filter changed:', newValue);
    this.filterBooks(newValue || '');
  }

  public created() {
    console.log("Books:", this.books);
    this.filterBooks(this.books);
  }

  private formatMenuItems():KeyValue[] {
    if (this.books) {
      return this.books.map(book=>new KeyValue(book._id, `${book.number} - ${book.name}`));
    }
    return [];
  }

}