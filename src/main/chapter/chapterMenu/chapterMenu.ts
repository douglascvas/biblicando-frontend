import {Menu} from "../../common/menu";
import {Chapter} from "../chapter";
import {LoggerFactory} from "../../common/loggerFactory";
import {Overlay} from "../../common/overlay";

export class ChapterMenu extends Menu<Chapter> {
  constructor(_overlay:Overlay, _loggerFactory:LoggerFactory) {
    super(_overlay, _loggerFactory.getLogger('ChapterMenu'));
  }

  public filterItems(filterValue:string):Chapter[] {
    return (this.items || [])
      .filter(chapter=>chapter.number.toString().indexOf(filterValue.toLowerCase()) >= 0);
  }
}