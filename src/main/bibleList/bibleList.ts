import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";

@inject(HttpClient)
@customElement('bible-list')
export class BibleList {
  @bindable selectable:Selectable;
  @bindable bibles:Array<any>;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
  }

  public created() {
    const self = this;
    // self.appConfig = {};
    self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        self.bibles = JSON.parse(httpResponse.response);
      });
  }

  public selectableChanged(newValue, oldValue) {
    console.log("Config changed", JSON.stringify(newValue));
  }

  public biblesChanged(newValue, oldValue) {
    console.log("Bibles changed");
  }

  public selectBible(bibleId) {
    this.selectable.selectedValue = bibleId;
  }

}