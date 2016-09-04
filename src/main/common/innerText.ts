import {customAttribute} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {DOM} from "aurelia-pal";

@inject(DOM.Element)
@customAttribute('inner-text')
export class InnerText {
  private value:string;

  constructor(private element:any) {
  }

  public valueChanged(newValue, oldValue){
    this.element.innerText = this.value;
  }

  public bind() {
    this.element.innerText = this.value;
  }
}