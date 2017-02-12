import {MenuFilter} from "../menu/MenuFilter";
import {Chapter} from "./Chapter";

export default class ChapterFilter extends MenuFilter<Chapter> {
  constructor(query: string) {
    super(query);
  }

  public filter(items: Chapter[]): Chapter[] {
    items = items || [];
    return items.filter(chapter => chapter.number.toString().toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
  }
}
