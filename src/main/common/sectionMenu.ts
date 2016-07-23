import {customAttribute} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {DOM} from "aurelia-pal";

@inject(DOM.Element)
@customAttribute('section-menu')
export class SectionMenu {
  private value:string;

  constructor(private element:any) {
  }

  public valueChanged(newValue, oldValue) {
    this.element.innerText = this.value;
  }

  private disablePageScroll() {
    document.body.style['overflow-y'] = 'scroll';
    document.body.style.position = 'fixed'
  }

  private enablePageScroll() {
    document.body.style['overflow-y'] = 'auto';
    document.body.style.position = 'static'
  }

  public bind() {
    // this.element.onmouseover = () => this.disablePageScroll();
    // this.element.onmouseout = () => this.enablePageScroll();
  }
}