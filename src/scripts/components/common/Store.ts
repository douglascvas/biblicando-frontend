import {Observer} from "./observer";

export class Store<E> {
  private _item: E;
  private _onChange: Observer<E>;

  constructor() {
    this._onChange = new Observer();
  }

  get item(): E {
    return this._item;
  }

  public replaceItem(item: E): void {
    const oldItems = this._item;
    this._item = item;
    this._onChange.trigger(item, oldItems);
  }

  public onChange(callback: (after: E, before: E) => void) {
    this._onChange.subscribe(callback);
  }
}
