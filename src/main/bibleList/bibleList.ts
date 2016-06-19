import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bible-list')
export class Page {
  @bindable config:any;
  @bindable bibles:Array<any>;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started");
    const self = this;
    self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        console.log(JSON.parse(httpResponse.response));
        self.bibles = JSON.parse(httpResponse.response);
      });
    // console.log(newValue, oldValue);
  }

  public configChanged(newValue, oldValue) {
    console.log("Config", newValue);
  }

  public selectBible(bibleId) {
    console.log("Bible2:", bibleId);
  }

}