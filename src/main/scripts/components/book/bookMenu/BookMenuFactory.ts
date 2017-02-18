import {AbstractMenu} from "../../menu/AbstractMenu";
import {Book} from "../Book";
import {BookMenu} from "./BookMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {BookMenuBodyFactory} from "./menuBody/BookMenuBodyFactory";
import {LoggerFactory} from "../../common/logger/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";
import {MenuFilterFactoryDefault, MenuFilterFactory} from "../../menu/MenuFilterFactory";
import {MenuItemFactory, MenuItemFactoryDefault} from "../../menu/MenuItemFactory";
import {SearchFactory} from "../../search/SearchFactory";
import {ConsoleLoggerFactory} from "../../common/logger/ConsoleLoggerFactory";

export class BookMenuFactory implements MenuFactory<Book> {
  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Book> {
    return new BookMenu(overlay,
      this.getMenuItemFactory(),
      this.getSearchFactory(),
      this.getMenuFilterFactory(),
      this.getBookMenuBodyFactory(),
      this.getSectionContextFactory().create(),
      this.getLoggerFactory()
    );
  }

  private getMenuItemFactory(): MenuItemFactory {
    return this._container.getValue(MenuItemFactory, () => new MenuItemFactoryDefault());
  }

  private getSearchFactory(): SearchFactory {
    return this._container.getValue(SearchFactory, () => new SearchFactory());
  }

  private getMenuFilterFactory(): MenuFilterFactory {
    return new MenuFilterFactoryDefault();
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
