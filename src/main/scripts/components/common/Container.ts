export class Container {
  private _instanceMap: Map<any,any>;

  constructor() {
    this._instanceMap = new Map();
  }

  public getValue<E>(key: any, factoryMethod?: () => E): E {
    let instance: E = this._instanceMap.get(key);
    if (instance === undefined && typeof factoryMethod === 'function') {
      instance = factoryMethod();
      this._instanceMap.set(key, instance);
    }
    return instance;
  }
}
