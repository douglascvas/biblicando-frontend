import {Menu} from "./menu";

export class ChapterMenu extends Menu {
  constructor() {
    super(this.filterChapters);
  }

  private filterChapters(chapters:any[], filter:string):any[] {
    return (chapters || [])
      .filter(chapter=>chapter.number.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }
}