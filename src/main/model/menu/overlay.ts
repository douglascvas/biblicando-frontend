export class Overlay {
  private _visible:boolean;

  public get visible():boolean {
    return this._visible;
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
}