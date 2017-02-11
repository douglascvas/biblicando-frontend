import {Observer} from "./observer";
import {Store} from "./Store";
import {Logger} from "./loggerFactory";
import {Filter} from "./filter/Filter";

export abstract class ItemList<E> {
  protected onChangeObserver: Observer<E[]>;

  constructor(protected _itemStore: Store<E>,
              protected _logger: Logger,
              protected _filter?: Filter<E>) {
    this.onChangeObserver = new Observer<E[]>();
    this._itemStore.onChange(items => this.changeItems());
  }

  public getItems(): E[] {
    if (this._filter && this._itemStore.items) {
      return this._filter.filter(this._itemStore.items);
    }
    return this._itemStore.items || [];
  }

  public onChange(callback: (items: E[]) => void): Function {
    return this.onChangeObserver.subscribe(callback);
  }

  public changeFilter(filter: Filter<E>): void {
    this._filter = filter;
    this.changeItems();
  }

  private changeItems() {
    this.onChangeObserver.trigger(this.getItems());
  }

}
