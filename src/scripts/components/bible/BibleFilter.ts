import {Filter} from "../common/filter/Filter";
import {Bible} from "./Bible";

export default class BibleFilter extends Filter<Bible> {
  constructor(query: string) {
    super(query);
  }

  filter(items: Bible[]): Bible[] {
    items = items || [];
    return items.filter(bible => bible.name.toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
  }
}
