import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";

@inject(HttpClient)
@customElement('verse-list')
export class VerseList {
  @bindable chapter:String;
  @bindable verses:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

  public chapterChanged(newValue, oldValue) {
    const self = this;
    console.log("## Loading verses for ", newValue);
    if (!newValue) {
      return;
    }
    self.httpClient.get(`api/v1/chapter/${newValue}/verses`)
      .then(httpResponse => {
        console.log("Verse:", httpResponse.response);
        console.log(JSON.parse(httpResponse.response));
        self.verses = JSON.parse(httpResponse.response);
      });
  }
}