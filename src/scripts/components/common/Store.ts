import {Observer} from "./Observer";

export class Store<E> {
  private _items: E[];
  private _onChange: Observer<E[]>;

  constructor() {
    this._onChange = new Observer();
  }

  get items(): E[] {
    return this._items;
  }

  public replaceAll(items: E[]): Promise<void> {
    const oldItems = this._items;
    this._items = items;
    return this._onChange.trigger(items, oldItems);
  }

  public onChange(callback: (newValue: E[]) => void): Function {
    return this._onChange.subscribe(callback);
  }
}
