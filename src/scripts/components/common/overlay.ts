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

  public show(): Promise<void> {
    this._visible = true;
    return this._onShow.trigger();
  }

  public hide(): Promise<void> {
    this._visible = false;
    return this._onHide.trigger();
  }

  public toggle(): Promise<void> {
    if (this._visible) {
      return this.hide();
    }
    return this.show();
  }

  public get visible(): boolean {
    return this._visible;
  }
}
