import {Observer} from "../common/observer";

export class Search {
  private _changeQueryObserver: Observer<string>;
  private _keyPressObserver: Observer<string>;
  private _query: string;

  constructor() {
    this._changeQueryObserver = new Observer();
    this._keyPressObserver = new Observer();
    this.triggerQueryChange = this.triggerQueryChange.bind(this);
    this.triggerKeyPress = this.triggerKeyPress.bind(this);
  }

  get query(): string {
    return this._query;
  }

  public triggerQueryChange(newQuery: string): void {
    this._query = newQuery;
    this._changeQueryObserver.trigger(newQuery);
  }

  public triggerKeyPress(event: any): void {
    this._keyPressObserver.trigger(event);
  }

  public onQueryChange(callback: (string) => void) {
    return this._changeQueryObserver.subscribe(callback);
  }

  public onKeyPress(callback: (event) => void) {
    return this._keyPressObserver.subscribe(callback);
  }
}
