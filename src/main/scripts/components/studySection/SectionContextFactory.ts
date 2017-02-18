import {Factory} from "../common/BasicFactory";
import {SectionContext} from "./SectionContext";
import {Container} from "../common/Container";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";

export class SectionContextFactory implements Factory<SectionContext> {
  constructor(private _container: Container) {
  }

  public create(): SectionContext {
    return this._container.getValue(SectionContext, () => new SectionContext(this.getLoggerFactory()));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
