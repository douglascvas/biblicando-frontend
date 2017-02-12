import {MenuItem} from "./MenuItem";

export class MenuFilter<E> {
  constructor(public query: string) {
  }

  public filter(items: MenuItem<E>[]): MenuItem<E>[] {
    items = items || [];
    return items.filter((item: MenuItem<E>) => !this.query || !item || !item.label || item.label.toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
  }
}
