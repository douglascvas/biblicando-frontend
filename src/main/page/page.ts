import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bb-page')
export class Page {
  @bindable text:string;
  @bindable chapter:string;

  constructor(private httpClient:HttpClient) {
  }

  public textChanged(newValue, oldValue) {
    this.httpClient.get('bibles')
      .then(bibles => {
        console.log(bibles);
      });
    console.log(newValue, oldValue);
  }
}