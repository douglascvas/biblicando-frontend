import {Observer} from "../common/Observer";
import {Logger} from "../common/LoggerFactory";
import {MenuItem} from "./MenuItem";
import {MenuFilter} from "./MenuFilter";

export abstract class MenuBody<E> {
  private _items: MenuItem<E>[];
  protected _onChangeObserver: Observer<MenuItem<E>[]>;

  constructor(protected _filter: MenuFilter,
              protected _logger: Logger) {
    this._onChangeObserver = new Observer<MenuItem<E>[]>();
  }

  public setFilter(filter): Promise<void> {
    this._filter = filter;
    return this.itemsChanged();
  }

  public setItems(items: MenuItem<E>[]): Promise<void> {
    this._items = items;
    return this.itemsChanged();
  }

  public getItems(): MenuItem<E>[] {
    return this._filter.filter(this._items);
  }

  public onChange(callback: (items: MenuItem<E>[]) => void): Function {
    return this._onChangeObserver.subscribe(callback);
  }

  protected itemsChanged(): Promise<void> {
    return this._onChangeObserver.trigger(this.getItems());
  }
}
