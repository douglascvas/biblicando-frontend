import {AbstractMenu} from "../../menu/AbstractMenu";
import {Bible} from "../Bible";
import {BibleMenu} from "./BibleMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {BibleMenuBodyFactory} from "./menuBody/BibleMenuBodyFactory";
import {LoggerFactory} from "../../common/logger/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../menu/MenuFilterFactory";
import {MenuItemFactory, MenuItemFactoryDefault} from "../../menu/MenuItemFactory";
import {SearchFactory} from "../../search/SearchFactory";
import {ConsoleLoggerFactory} from "../../common/logger/ConsoleLoggerFactory";

export class BibleMenuFactory implements MenuFactory<Bible> {

  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Bible> {
    return new BibleMenu(overlay,
      this.getMenuItemFactory(),
      this.getSearchFactory(),
      this.getMenuFilterFactory(),
      this.getBibleMenuBodyFactory(),
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

  private getBibleMenuBodyFactory(): BibleMenuBodyFactory {
    return this._container.getValue(BibleMenuBodyFactory, () => new BibleMenuBodyFactory(this._container));
  }

  private getSectionContextFactory(): SectionContextFactory {
    return this._container.getValue(SectionContextFactory, () => new SectionContextFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
