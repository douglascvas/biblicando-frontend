import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('book-list')
export class Page {
  @bindable config: any;
  @bindable bibleId:String;
  @bindable books:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

  public biblesChanged(newValue, oldValue) {
    const self = this;
    self.httpClient.get(`api/v1/books/${self.bibleId}`)
      .then(httpResponse => {
        console.log(JSON.parse(httpResponse.response));
        self.books = JSON.parse(httpResponse.response);
      });
    console.log(newValue, oldValue);
  }
}