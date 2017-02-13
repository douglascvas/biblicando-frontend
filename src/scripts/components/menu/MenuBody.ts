import {Observer} from "../common/observer";
import {Logger} from "../common/loggerFactory";
import {MenuItem} from "./MenuItem";
import {MenuFilter} from "./MenuFilter";

export abstract class MenuBody<E> {
  private _items: MenuItem<E>[];
  protected _onChangeObserver: Observer<MenuItem<E>[]>;

  constructor(protected _logger: Logger,
              protected _filter?: MenuFilter<E>) {
    this._onChangeObserver = new Observer<MenuItem<E>[]>();
  }

  public setItems(items: MenuItem<E>[]): Promise<void> {
    this._items = items;
    return this.itemsChanged();
  }

  public getItems(): MenuItem<E>[] {
    if (this._filter && this._items) {
      return this._filter.filter(this._items);
    }
    return this._items || [];
  }

  public onChange(callback: (items: MenuItem<E>[]) => void): Function {
    return this._onChangeObserver.subscribe(callback);
  }

  public setFilter(newFilter: MenuFilter<E>): Promise<void> {
    this._logger.debug(`Changing filter to: "${newFilter.query}"`);
    this._filter = newFilter;
    return this.itemsChanged();
  }

  protected itemsChanged(): Promise<void> {
    return this._onChangeObserver.trigger(this.getItems());
  }
}
