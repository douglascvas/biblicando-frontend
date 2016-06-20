import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";

@inject(HttpClient)
@customElement('chapter-list')
export class ChapterList {
  @bindable selectable:Selectable;
  @bindable book:String;
  @bindable chapters:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

  public bookChanged(newValue, oldValue) {
    const self = this;
    if (!self.book) {
      return;
    }
    console.log("## Loading books for ", newValue);
    self.httpClient.get(`api/v1/book/${newValue}/chapters`)
      .then(httpResponse => {
        console.log(JSON.parse(httpResponse.response));
        self.chapters = JSON.parse(httpResponse.response);
      });
  }
}