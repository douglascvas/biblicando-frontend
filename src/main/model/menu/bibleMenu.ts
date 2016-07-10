import {Menu} from "./menu";

export class BibleMenu extends Menu {
  constructor() {
    super(this.filterBibles);
  }

  private filterBibles(bibles:any[], filter:string):any[] {
    return (bibles || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }
}