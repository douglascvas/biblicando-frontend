import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
@customElement('verse-list')
export class VerseList {
  @bindable verses:Array<any>;

  constructor() {
  }

}