import {LoggerFactory} from "../../../common/logger/LoggerFactory";
import {ChapterMenuBody} from "./ChapterMenuBody";
import {Factory} from "../../../common/BasicFactory";
import {Container} from "../../../common/Container";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../../menu/MenuFilterFactory";
import {ConsoleLoggerFactory} from "../../../common/logger/ConsoleLoggerFactory";

export class ChapterMenuBodyFactory implements Factory<ChapterMenuBody> {
  constructor(private _container: Container) {
  }

  public create(): ChapterMenuBody {
    return new ChapterMenuBody(this.getFilterFactory(), this.getLoggerFactory());
  }

  private getFilterFactory() {
    return this._container.getValue(MenuFilterFactory, () => new MenuFilterFactoryDefault());
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
