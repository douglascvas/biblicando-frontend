import {LoggerFactory} from "../../../common/logger/LoggerFactory";
import {BibleMenuBody} from "./BibleMenuBody";
import {Factory} from "../../../common/BasicFactory";
import {Container} from "../../../common/Container";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../../menu/MenuFilterFactory";
import {ConsoleLoggerFactory} from "../../../common/logger/ConsoleLoggerFactory";

export class BibleMenuBodyFactory implements Factory<BibleMenuBody> {
  constructor(private _container: Container) {
  }

  public create(): BibleMenuBody {
    return new BibleMenuBody(this.getMenuFilterFactory(), this.getLoggerFactory());
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory())
  }

  private getMenuFilterFactory(): MenuFilterFactory {
    return new MenuFilterFactoryDefault();
  }
}
