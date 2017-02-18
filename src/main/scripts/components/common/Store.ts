import {Observer} from "./Observer";
import {Logger} from "./logger/Logger";

export abstract class Store<E> {
  private _items: E[];
  private _onChange: Observer<E[]>;

  constructor(protected _logger: Logger) {
    this._onChange = new Observer();
  }

  public replaceAll(items: E[]): Promise<void> {
    const oldItems = this._items;
    this._items = items;
    if (oldItems !== this._items) {
      this._logger.debug(`Bibles replaced into store.`);
      return this._onChange.trigger(items, oldItems);
    }
  }

  public onChange(callback: (newValue: E[]) => void): Function {
    return this._onChange.subscribe(callback);
  }

  get items(): E[] {
    return this._items;
  }

}
