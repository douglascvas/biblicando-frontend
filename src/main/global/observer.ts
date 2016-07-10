export class Observer {
  private _listeners:Array<(any)=>any>;

  constructor() {
    this._listeners = [];
  }

  public observe(listener:(any)=>any) {
    const self = this;
    self._listeners.push(listener);
    return () => {
      var fnIndex = self._listeners.indexOf(listener);
      while (fnIndex >= 0) {
        self._listeners.splice(fnIndex, 1);
        fnIndex = self._listeners.indexOf(listener);
      }
    };
  }

  public trigger(value) {
    this._listeners.forEach(fn=> {
      if (typeof fn === 'function') {
        try {
          fn(value);
        } catch (e) {
          console.log(e);
        }
      }
    })
  }

}