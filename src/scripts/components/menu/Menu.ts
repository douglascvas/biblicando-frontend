import {Observer} from "../common/observer";
import {Logger} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {Search} from "../search/Search";
import {ItemList} from "../common/ItemList";

export abstract class Menu<E> {
  private _selected: E;
  private _visible: boolean;
  private _onSelectObserver: Observer<E>;
  private _onShowObserver: Observer<E>;

  constructor(protected _overlay: Overlay,
              protected _search: Search,
              protected _itemList: ItemList<E>,
              protected _logger: Logger) {
    this._visible = false;
    this._onSelectObserver = new Observer();
    this._onShowObserver = new Observer();

    _overlay.onShow(() => this.hide());
  }

  public selectItem(selectedItem: E) {
    this._logger.debug(`Selected item ${selectedItem}`);
    this._selected = selectedItem;
    this._onSelectObserver.trigger(selectedItem);
  }

  public onSelect(listener) {
    return this._onSelectObserver.subscribe(listener);
  }

  public onShow(listener) {
    return this._onShowObserver.subscribe(listener);
  }

  get itemList(): ItemList<E> {
    return this._itemList;
  }

  get search(): Search {
    return this._search;
  }

  get selected(): E {
    return this._selected;
  }

  get visible(): boolean {
    return this._visible;
  }

  public show() {
    this._onShowObserver.trigger();
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

}
