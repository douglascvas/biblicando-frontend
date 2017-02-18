import {TestLogger} from "./TestLogger";
import {LoggerFactory} from "../../../../../main/scripts/components/common/logger/LoggerFactory";
import {Logger} from "../../../../../main/scripts/components/common/logger/Logger";
import {ObjectUtils} from "../../../../../main/scripts/components/common/ObjectUtils";

export class TestLoggerFactory implements LoggerFactory {
  private _loggers;

  constructor() {
    this._loggers = {};
  }

  public getLogger(loggerIdentifier: any): Logger {
    const name = (typeof loggerIdentifier === 'string') ? loggerIdentifier : ObjectUtils.extractClassName(loggerIdentifier);
    return new TestLogger(name);
  }
}
