import {Observer} from "./observer";

export class Overlay {
  private _onHide:Observer<any>;
  private _onShow:Observer<any>;
  private visible:boolean;

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

  public show() {
    this._onShow.trigger();
    this.visible = true;
  }

  public hide() {
    this._onHide.trigger();
    this.visible = false;
  }

  public toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
}