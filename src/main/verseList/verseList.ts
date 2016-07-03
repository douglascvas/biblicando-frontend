import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('verse-list')
export class VerseList {
  @bindable verses:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

}