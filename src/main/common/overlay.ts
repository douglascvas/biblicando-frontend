import {Observer} from "./observer";
import {computedFrom} from "aurelia-binding";

export class Overlay {
  private _onHide:Observer;
  private _onShow:Observer;
  private _visible:boolean;

  constructor() {
    this._onHide = new Observer();
    this._onShow = new Observer();
  }

  public onShow(fn:(any)=>any) {
    this._onShow.observe(fn);
  }

  public onHide(fn:(any)=>any) {
    this._onHide.observe(fn);
  }

  @computedFrom('_visible')
  public get visible():boolean {
    return this._visible;
  }

  public show() {
    this._visible = true;
    this._onShow.trigger();
  }

  public hide() {
    this._visible = false;
    this._onHide.trigger();
  }

  public toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }
}