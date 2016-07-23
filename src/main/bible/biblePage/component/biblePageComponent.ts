import {customElement, bindable} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {BiblePage} from "../biblePage";

@autoinject()
@customElement('bible-page')
export class BiblePageComponent {
  @bindable page:BiblePage;

  constructor() {
  }
}