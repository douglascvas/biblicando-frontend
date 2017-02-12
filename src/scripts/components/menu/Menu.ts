import {Observer} from "../common/observer";
import {Logger} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {MenuItem} from "./MenuItem";

export abstract class Menu<E> {
  private _selected: MenuItem<E>;
  private _visible: boolean;
  private _onSelectObserver: Observer<MenuItem<E>>;
  private _onShowObserver: Observer<MenuItem<E>>;
  private _onHideObserver: Observer<MenuItem<E>>;

  constructor(protected _overlay: Overlay,
              protected _logger: Logger) {
    this._visible = false;
    this._onSelectObserver = new Observer();
    this._onShowObserver = new Observer();
    this._onHideObserver = new Observer();

    _overlay.onShow(() => this.hide());
  }

  public selectItem(selectedItem: MenuItem<E>) {
    this._logger.debug(`Selected item ${selectedItem}`);
    this._selected = selectedItem;
    this._onSelectObserver.trigger(selectedItem);
  }

  public onSelect(listener): Function {
    return this._onSelectObserver.subscribe(listener);
  }

  public onShow(listener): Function {
    return this._onShowObserver.subscribe(listener);
  }

  public onHide(listener): Function {
    return this._onHideObserver.subscribe(listener);
  }

  public onToggle(listener): Function {
    const hideUnsubscribe = this.onHide(listener);
    const showUnsubscribe = this.onShow(listener);
    return () => {
      hideUnsubscribe();
      showUnsubscribe();
    };
  }

  get selected(): MenuItem<E> {
    return this._selected;
  }

  get visible(): boolean {
    return this._visible;
  }

  public show(): void {
    this._overlay.show();
    this._visible = true;
    this._onShowObserver.trigger();
  }

  public hide(): void {
    this._overlay.hide();
    this._visible = false;
    this._onHideObserver.trigger();
  }

  public toggle(): void {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }

}
