import {AbstractMenu} from "../../menu/AbstractMenu";
import {Chapter} from "../Chapter";
import {ChapterMenu} from "./ChapterMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {ChapterMenuBodyFactory} from "./menuBody/ChapterMenuBodyFactory";
import {LoggerFactory} from "../../common/logger/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../menu/MenuFilterFactory";
import {MenuItemFactory, MenuItemFactoryDefault} from "../../menu/MenuItemFactory";
import {SearchFactory} from "../../search/SearchFactory";
import {ConsoleLoggerFactory} from "../../common/logger/ConsoleLoggerFactory";

export class ChapterMenuFactory implements MenuFactory<Chapter> {
  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Chapter> {
    return new ChapterMenu(overlay,
      this.getMenuItemFactory(),
      this.getSearchFactory(),
      this.getMenuFilterFactory(),
      this.getChapterMenuBodyFactory(),
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
    return this._container.getValue(MenuFilterFactory, () => new MenuFilterFactoryDefault());
  }

  private getChapterMenuBodyFactory(): ChapterMenuBodyFactory {
    return this._container.getValue(ChapterMenuBodyFactory, () => new ChapterMenuBodyFactory(this._container));
  }

  private getSectionContextFactory(): SectionContextFactory {
    return this._container.getValue(SectionContextFactory, () => new SectionContextFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
