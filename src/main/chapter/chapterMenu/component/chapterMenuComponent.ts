import {bindable, customElement} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {ChapterMenu} from "../chapterMenu";
import {Chapter} from "../../chapter";
import {AbstractMenuComponent} from "../../../common/abstractMenuComponent";
import {Menu} from "../../../common/menu";

@autoinject
@customElement('chapter-menu')
export class ChapterMenuComponent extends AbstractMenuComponent<Chapter> {
  @bindable menu:ChapterMenu;

  protected getMenu():Menu<Chapter> {
    return this.menu;
  }

  public formatMenuItem(chapter:Chapter):String {
    return (chapter.number || 1).toString();
  }
}