import {Factory} from "../common/BasicFactory";
import {Container} from "../common/Container";
import {Workspace} from "./Workspace";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {StudySectionFactory} from "../studySection/StudySectionFactory";
import {StudySection} from "../studySection/StudySection";
import {BibleServiceFactory} from "../bible/BibleServiceFactory";
import {BibleService} from "../bible/BibleService";
import {BibleStoreFactory} from "../bible/BibleStoreFactory";
import {BibleStore} from "../bible/BibleStore";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";

export class WorkspaceFactory implements Factory<Workspace> {
  constructor(private _container: Container) {
  }

  create(): Workspace {
    return this._container.getValue(Workspace, () => new Workspace(
      this.getStudySectionFactory(),
      this.getBibleServiceFactory().create(),
      this.getBibleStoreFactory().create(),
      this.getLoggerFactory()
    ));
  }

  private getStudySectionFactory(): Factory<StudySection> {
    return this._container.getValue(StudySectionFactory, () => new StudySectionFactory(this._container));
  }

  private getBibleServiceFactory(): Factory<BibleService> {
    return this._container.getValue(BibleServiceFactory, () => new BibleServiceFactory(this._container));
  }

  private getBibleStoreFactory(): Factory<BibleStore> {
    return this._container.getValue(BibleStoreFactory, () => new BibleStoreFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory())
  }
}
