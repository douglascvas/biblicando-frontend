import {Observer} from "./observer";
import {Logger} from "./loggerFactory";
import {Overlay} from "./overlay";

export abstract class Menu<E> {
  private _selected:E;
  private _items:E[];
  private _filteredItems:E[];
  private _visible:boolean;
  private _filter:string;
  private _onSelect:Observer<E>;
  private _onShow:Observer<E>;

  constructor(private _overlay:Overlay,
              private _logger:Logger) {
    this._items = [];
    this._filteredItems = [];
    this._visible = false;
    this._onSelect = new Observer();
    this._onShow = new Observer();

    _overlay.onShow(()=>this.hide());
  }

  abstract filterItems(filterValue:string):E[];

  public onSelect(listener) {
    return this._onSelect.observe(listener);
  }

  public onShow(listener) {
    return this._onShow.observe(listener);
  }

  public update(items) {
    this._logger.debug(`Updated ${items.length} menu items`);
    this._items = items;
    this._filterItems();
  }

  get items():E[] {
    return this._items;
  }

  get selected():E {
    return this._selected;
  }

  get filteredItems():E[] {
    return this._filteredItems;
  }

  get visible():boolean {
    return this._visible;
  }

  get filter():string {
    return this._filter;
  }

  set filter(value:string) {
    this._filter = value;
    this._filterItems();
  }

  public show() {
    this._onShow.trigger();
    this._overlay.show();
    this._visible = true;
  }

  public hide() {
    this._overlay.hide();
    this._visible = false;
  }

  public toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  private _filterItems() {
    if (!this._filter) {
      this._filteredItems = this._items;
      return;
    }
    this._logger.debug("filtering items with ", this._filter);
    this._filteredItems = this.filterItems(this._filter);
  }

  public selectItem(item:E) {
    this._selected = item;
    this._onSelect.trigger(item);
  }
}