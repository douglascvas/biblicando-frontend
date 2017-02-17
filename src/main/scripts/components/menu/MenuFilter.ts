import {MenuItem} from "./MenuItem";

export class MenuFilter {
  constructor(private _query: string) {
  }

  public filter<E>(items: MenuItem<E>[]): MenuItem<E>[] {
    items = items || [];
    return items.filter((item: MenuItem<E>) => !this._query || !item || !item.label ||
    item.label.toLowerCase().indexOf(this._query.toLocaleLowerCase().toLowerCase()) >= 0);
  }
}
