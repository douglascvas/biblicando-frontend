import {ObjectUtils} from "../ObjectUtils";
import {Logger} from "./Logger";
import {ConsoleLogger} from "./ConsoleLogger";
import {LoggerFactory} from "./LoggerFactory";

export class ConsoleLoggerFactory implements LoggerFactory {
  private _loggers;

  constructor() {
    this._loggers = {};
  }

  public getLogger(loggerIdentifier: any): Logger {
    const name = (typeof loggerIdentifier === 'string') ? loggerIdentifier : ObjectUtils.extractClassName(loggerIdentifier);
    return new ConsoleLogger(name);
  }
}
