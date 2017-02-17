import {LoggerFactory, ConsoleLoggerFactory} from "../../../common/LoggerFactory";
import {BookMenuBody} from "./BookMenuBody";
import {Factory} from "../../../common/BasicFactory";
import {Container} from "../../../common/Container";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../../menu/MenuFilterFactory";

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
