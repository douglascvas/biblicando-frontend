import {Observer} from "../common/Observer";

export class Search {
  private _changeQueryObserver: Observer<string>;
  private _keyDownObserver: Observer<string>;
  private _query: string;

  constructor() {
    this._changeQueryObserver = new Observer();
    this._keyDownObserver = new Observer();
    this.triggerQueryChange = this.triggerQueryChange.bind(this);
    this.triggerKeyDown = this.triggerKeyDown.bind(this);
  }

  get query(): string {
    return this._query;
  }

  public triggerQueryChange(newQuery: string): void {
    this._query = newQuery;
    this._changeQueryObserver.trigger(newQuery);
  }

  public triggerKeyDown(event: any): void {
    this._keyDownObserver.trigger(event);
  }

  public onQueryChange(callback: (string) => void) {
    return this._changeQueryObserver.subscribe(callback);
  }

  public onKeyPress(callback: (event) => void) {
    return this._keyDownObserver.subscribe(callback);
  }
}
