import {Menu} from "../../common/menu";
import {Bible} from "../bible";
import {LoggerFactory} from "../../common/loggerFactory";
import {Overlay} from "../../common/overlay";

export class BibleMenu extends Menu<Bible> {
  constructor(_overlay:Overlay,
              _loggerFactory:LoggerFactory) {
    super(_overlay, _loggerFactory.getLogger('BibleMenu'));
  }

  public filterItems(filterValue:string):Bible[] {
    return (this.items || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
  }
}