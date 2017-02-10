import {Observer} from "./observer";

export class Overlay {
  private _onHide: Observer<any>;
  private _onShow: Observer<any>;
  private _visible: boolean;

  constructor() {
    this._onHide = new Observer();
    this._onShow = new Observer();
  }

  public onShow(fn: (any) => any) {
    this._onShow.subscribe(fn);
  }

  public onHide(fn: (any) => any) {
    this._onHide.subscribe(fn);
  }

  public show() {
    this._onShow.trigger();
    this._visible = true;
  }

  public hide() {
    this._onHide.trigger();
    this._visible = false;
  }

  public toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public get visible(): boolean {
    return this._visible;
  }
}
