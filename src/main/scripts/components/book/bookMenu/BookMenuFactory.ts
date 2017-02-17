import {AbstractMenu} from "../../menu/AbstractMenu";
import {Book} from "../Book";
import {BookMenu} from "./BookMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {BookMenuBodyFactory} from "./menuBody/BookMenuBodyFactory";
import {LoggerFactory, ConsoleLoggerFactory} from "../../common/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";

export class BookMenuFactory implements MenuFactory<Book> {
  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Book> {
    return new BookMenu(overlay,
      this.getBookMenuBodyFactory(),
      this.getSectionContextFactory().create(),
      this.getLoggerFactory()
    );
  }

  private getBookMenuBodyFactory(): BookMenuBodyFactory {
    return this._container.getValue(BookMenuBodyFactory, () => new BookMenuBodyFactory(this._container));
  }

  private getSectionContextFactory(): SectionContextFactory {
    return this._container.getValue(SectionContextFactory, () => new SectionContextFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
