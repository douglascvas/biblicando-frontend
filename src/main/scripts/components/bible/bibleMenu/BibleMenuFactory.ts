import {AbstractMenu} from "../../menu/AbstractMenu";
import {Bible} from "../Bible";
import {BibleMenu} from "./BibleMenu";
import {Overlay} from "../../menu/Overlay";
import {Container} from "../../common/Container";
import {MenuFactory} from "../../common/MenuFactory";
import {BibleMenuBodyFactory} from "./menuBody/BibleMenuBodyFactory";
import {LoggerFactory, ConsoleLoggerFactory} from "../../common/LoggerFactory";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";

export class BibleMenuFactory implements MenuFactory<Bible> {

  constructor(private _container: Container) {
  }

  public create(overlay: Overlay): AbstractMenu<Bible> {
    return new BibleMenu(overlay,
      this.getBibleMenuBodyFactory(),
      this.getSectionContextFactory().create(),
      this.getLoggerFactory()
    );
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
