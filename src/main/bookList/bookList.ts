import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";

@inject(HttpClient)
@customElement('book-list')
export class BookList {
  @bindable selectable:Selectable;
  @bindable bible:String;
  @bindable books:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

  public bibleChanged(newValue, oldValue) {
    const self = this;
    if (self.bible) {
      console.log("## Loading books for ", newValue);
      self.httpClient.get(`api/v1/bible/${self.bible}/books`)
        .then(httpResponse => {
          console.log(JSON.parse(httpResponse.response));
          self.books = JSON.parse(httpResponse.response);
        });
    }
  }

  public selectBook(bookId) {
    console.log("## Selected book", bookId);
    this.selectable.selectedValue = bookId;
  }
}