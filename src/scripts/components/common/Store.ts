import {Observer} from "./observer";

export class Store<E> {
  private _items: E[];
  private _onChange: Observer<E[]>;

  constructor() {
    this._onChange = new Observer();
  }

  get items(): E[] {
    return this._items;
  }

  public replaceAll(items: E[]): void {
    const oldItems = this._items;
    this._items = items;
    this._onChange.trigger(items, oldItems);
  }

  public onChange(callback: (after: E, before: E) => void) {
    this._onChange.subscribe(callback);
  }
}
