import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bb-page')
export class Page {
  @bindable bibles:Array<any>;

  constructor(private httpClient:HttpClient) {
  }

  public biblesChanged(newValue, oldValue) {
    const self = this;
    self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        console.log(JSON.parse(httpResponse.response));
        self.bibles = JSON.parse(httpResponse.response);
      });
    console.log(newValue, oldValue);
  }
}