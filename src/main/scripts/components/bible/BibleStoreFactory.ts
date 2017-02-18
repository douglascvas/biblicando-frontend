import {Factory} from "../common/BasicFactory";
import {Container} from "../common/Container";
import {BibleStore} from "./BibleStore";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";
import {LoggerFactory} from "../common/logger/LoggerFactory";

export class BibleStoreFactory implements Factory<BibleStore> {
  constructor(private _container: Container) {
  }

  create(): BibleStore {
    return this._container.getValue(BibleStore, () => new BibleStore(this.getLoggerFactory()));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory())
  }
}
