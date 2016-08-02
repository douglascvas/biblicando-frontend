import {bindable, customElement} from "aurelia-templating";
import {BibleMenu} from "../bibleMenu";
import {Bible} from "../../bible";
import {AbstractMenuComponent} from "../../../common/abstractMenuComponent";
import {Menu} from "../../../common/menu";

@customElement('bible-menu')
export class BibleMenuComponent extends AbstractMenuComponent<Bible> {
  @bindable menu:BibleMenu;

  protected getMenu():Menu<Bible> {
    return this.menu;
  }

  public formatMenuItem(bible:Bible):String {
    return `${bible.languageCode} - ${bible.name}`;
  }

}