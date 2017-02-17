import {Observer} from "../common/Observer";
import {Logger} from "../common/LoggerFactory";
import {Overlay} from "./Overlay";
import {MenuItem} from "./MenuItem";

export abstract class AbstractMenu<E> {
  private _selected: MenuItem<E>;
  private _visible: boolean;
  private _onSelectObserver: Observer<MenuItem<E>>;
  private _onBeforeShowObserver: Observer<MenuItem<E>>;
  private _onShowObserver: Observer<MenuItem<E>>;
  private _onHideObserver: Observer<MenuItem<E>>;

  constructor(protected _overlay: Overlay,
              protected _logger: Logger) {
    this._visible = false;
    this._onSelectObserver = new Observer();
    this._onBeforeShowObserver = new Observer();
    this._onShowObserver = new Observer();
    this._onHideObserver = new Observer();

    // _overlay.onShow(() => this.hide());
  }

  public unregister() {
    // can be overwritten by a child class
  }

  public selectItem(selectedItem: MenuItem<E>): Promise<void> {
    this._logger.debug('Selected item', selectedItem);
    this._selected = selectedItem;
    return this._onSelectObserver.trigger(selectedItem);
  }

  public onSelect(listener): Function {
    return this._onSelectObserver.subscribe(listener);
  }

  public onShow(listener): Function {
    return this._onShowObserver.subscribe(listener);
  }

  public onBeforeShow(listener): Function {
    return this._onBeforeShowObserver.subscribe(listener);
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

  public async show(): Promise<void> {
    if (this._visible) {
      return;
    }
    await this._onBeforeShowObserver.trigger();
    await this._overlay.show();
    this._visible = true;
    return this._onShowObserver.trigger();
  }

  public async hide(): Promise<void> {
    if (!this._visible) {
      return;
    }
    await this._overlay.hide();
    this._visible = false;
    return this._onHideObserver.trigger();
  }

  public toggle(): Promise<void> {
    if (this._visible) {
      return this.hide();
    }
    this.show();
  }

}
