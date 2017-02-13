export class Observer<E> {
  private _listeners: Array<(E) => void>;

  constructor() {
    this._listeners = [];
  }

  public subscribe(listener: (...E) => void): Function {
    this._listeners.push(listener);
    return () => {
      let fnIndex;
      while ((fnIndex = this._listeners.indexOf(listener)) >= 0) {
        this._listeners.splice(fnIndex, 1);
      }
    };
  }

  public trigger(...value: E[]): Promise<any> {
    const args = arguments;
    const result: any[] = this._listeners.map(fn => {
      if (typeof fn === 'function') {
        return fn.apply(fn, value);
      }
      return null;
    });
    return Promise.all(result);
  }

}
