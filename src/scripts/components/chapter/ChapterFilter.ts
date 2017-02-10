import {Filter} from "../common/filter/Filter";
import {Chapter} from "./chapter";

export default class ChapterFilter extends Filter<Chapter> {
  constructor(query: string) {
    super(query);
  }

  public filter(items: Chapter[]): Chapter[] {
    items = items || [];
    return items.filter(chapter => chapter.number.toString().toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
  }
}
