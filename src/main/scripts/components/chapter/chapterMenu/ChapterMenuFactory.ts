import {AbstractMenu} from "../../menu/AbstractMenu";
import {Chapter} from "../Chapter";
import {ChapterMenu} from "./ChapterMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {ChapterMenuBodyFactory} from "./menuBody/ChapterMenuBodyFactory";
import {LoggerFactory, ConsoleLoggerFactory} from "../../common/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";
import {MenuFilterFactory, MenuFilterFactoryDefault} from "../../menu/MenuFilterFactory";

export class ChapterMenuFactory implements MenuFactory<Chapter> {
  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Chapter> {
    return new ChapterMenu(overlay,
      this.getMenuFilterFactory(),
      this.getChapterMenuBodyFactory(),
      this.getSectionContextFactory().create(),
      this.getLoggerFactory()
    );
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
