import {Logger} from "../common/loggerFactory";
import {StudySection} from "../studySection/StudySection";
import {Bible} from "../bible/Bible";
import {ServiceContainer} from "../common/ServiceContainer";
import {StoreContainer} from "../common/StoreContainer";

export class Workspace {
  private _logger: Logger;
  private _sections: StudySection[];

  constructor(private _storeContainer: StoreContainer,
              private _serviceContainer: ServiceContainer) {
    this.initialize();
    this._logger = _serviceContainer.getLoggerFactory().getLogger('Workspace');
  }

  public async loadBibles(): Promise<void> {
    const bibles = await this._serviceContainer.getBibleService().fetchBibles();
    return this.updateContainer(bibles);
  }

  private updateContainer(bibles: Bible[]): Promise<void> {
    return this._storeContainer.getBibleStore().replaceAll(bibles);
  }

  private createSection(): StudySection {
    return new StudySection(this._storeContainer, this._serviceContainer);
  }

  private removeSection(section: StudySection): void {
    section.unregister();
    const index = this._sections.indexOf(section);
    this._sections.splice(index, 1);
  }

  private initialize(): void {
    this._sections = [this.createSection()];
    this.loadBibles();
  }

  get sections(): StudySection[] {
    return this._sections;
  }
}
