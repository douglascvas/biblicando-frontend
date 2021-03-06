import {LoggerFactory} from "../../../common/logger/LoggerFactory";
import {BookMenuBody} from "./BookMenuBody";
import {Factory} from "../../../common/BasicFactory";
import {Container} from "../../../common/Container";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../../menu/MenuFilterFactory";
import {ConsoleLoggerFactory} from "../../../common/logger/ConsoleLoggerFactory";

export class BookMenuBodyFactory implements Factory<BookMenuBody> {
  constructor(private _container: Container) {
  }

  public create(): BookMenuBody {
    return new BookMenuBody(this.getFilterFactory(), this.getLoggerFactory());
  }

  private getFilterFactory() {
    return this._container.getValue(MenuFilterFactory, () => new MenuFilterFactoryDefault());
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
