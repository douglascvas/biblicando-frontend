import {Logger} from "../common/loggerFactory";
import {StudySection} from "../bible/biblePage/StudySection";
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

  public created(owningView, myView) {
    this._logger.debug('Element created');
    this.loadBibles();
  }

  private loadBibles() {
    return this._serviceContainer.getBibleService().fetchBibles()
      .then(bibles => this.updateBiblesOnPages(bibles));
  }

  private updateBiblesOnPages(bibles: Bible[]): void {
    this._sections.forEach(page => page.updateBibles(bibles))
  }

  private createSection(): StudySection {
    return new StudySection(this._storeContainer, this._serviceContainer);
  }

  private initialize() {
    this._sections = [this.createSection()];
  }

  get sections(): StudySection[] {
    return this._sections;
  }
}
