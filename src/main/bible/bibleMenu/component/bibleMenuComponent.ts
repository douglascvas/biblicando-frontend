import {bindable, customElement} from "aurelia-templating";
import {BibleMenu} from "../bibleMenu";
import {Bible} from "../../bible";
import {AbstractMenuComponent} from "../../../common/abstractMenuComponent";
import {Menu} from "../../../common/menu";

@customElement('bible-menu')
export class BibleMenuComponent extends AbstractMenuComponent {
  @bindable menu:BibleMenu;

  protected getMenu():Menu {
    return this.menu;
  }

  public formatMenuItem(bible:Bible):String {
    return `${bible.languageCode} - ${bible.name}`;
  }

}