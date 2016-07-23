import {bindable, customElement} from "aurelia-templating";
import {BibleMenu} from "../bibleMenu";
import {Bible} from "../../bible";

@customElement('bible-menu')
export class BibleMenuComponent {
  @bindable menu:BibleMenu;

  constructor() {
  }

  public selectItem(item):void {
    this.menu.selectItem(item);
  }

  public formatMenuItem(bible:Bible):String {
    return `${bible.languageCode} - ${bible.name}`;
  }

}