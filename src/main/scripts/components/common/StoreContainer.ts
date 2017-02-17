import {Store} from "./Store";
import {Bible} from "../bible/Bible";
import {BibleStore} from "../bible/BibleStore";

export class StoreContainer {
  private _bibleStore: Store<Bible>;

  public getBibleStore(): Store<Bible> {
    if (!this._bibleStore) {
      this._bibleStore = new BibleStore();
    }
    return this._bibleStore;
  }
}
