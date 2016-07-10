import {Observer} from "../../global/observer";
export class Menu {
  private _selected:any[];
  private _items:any[];
  private _filteredItems:any[];
  private _visible:boolean;
  private _filter:string;
  private _filterFunction:(any, string)=>any[];
  private _onSelect:Observer;

  public onSelect(listener) {
    return this._onSelect.observe(listener);
  }

  constructor(filterFunction:(any, string)=>any[]) {
    this._items = [];
    this._filteredItems = [];
    this._visible = false;
    this._onSelect = new Observer();
    this._filterFunction = filterFunction;
  }

  public update(items) {
    this._items = items;
    this._filterItems();
  }

  get items():any[] {
    return this._items;
  }

  get filteredItems():any[] {
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
    this._visible = true;
  }

  public hide() {
    this._visible = false;
  }

  public toggle() {
    this._visible = !this._visible;
  }

  private _filterItems() {
    if (!this._filter) {
      this._filteredItems = this._items;
      return;
    }
    if (typeof this._filterFunction === 'function') {
      console.log("filtering items with ", this._filter);
      this._filteredItems = this._filterFunction(this._items, this._filter);
    }
  }

  private selectItem(item) {
    this._onSelect.trigger(item);
  }
}