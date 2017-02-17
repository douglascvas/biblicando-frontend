export class Container {
  private _instanceMap: Map<any,any>;

  constructor() {
    this._instanceMap = new Map();
  }

  public getValue<E>(key: any, factoryMethod?: () => E): E {
    return this._instanceMap.get(key);
  }
}
