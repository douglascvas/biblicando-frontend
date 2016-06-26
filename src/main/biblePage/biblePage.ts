import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bible-page')
export class BiblePage {
  @bindable version;
  public showBibleList;

  constructor() {
    
  }

  toggleBibleList(){
    this.showBibleList = !this.showBibleList;
  }

}