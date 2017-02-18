import {LoggerFactory} from "../common/logger/LoggerFactory";
import {StudySection} from "../studySection/StudySection";
import {BibleService} from "../bible/BibleService";
import {BibleStore} from "../bible/BibleStore";
import {Factory} from "../common/BasicFactory";
import {Logger} from "../common/logger/Logger";

export class Workspace {
  private _logger: Logger;
  private _sections: StudySection[];

  constructor(private _studySectionFactory: Factory<StudySection>,
              private _bibleService: BibleService,
              private _bibleStore: BibleStore,
              _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger(Workspace);
    this._sections = [];
  }

  public initialize(): Promise<void> {
    this.createSection();
    return this.loadBibles();
  }

  public async loadBibles(): Promise<void> {
    const bibles = await this._bibleService.fetchBibles();
    this._logger.debug('Loaded', bibles.length, 'bibles');
    return this._bibleStore.replaceAll(bibles);
  }

  public createSection(): StudySection {
    const section: StudySection = this._studySectionFactory.create();
    this._sections.push(section);
    return section;
  }

  public removeSection(section: StudySection): void {
    section.unregister();
    const index = this._sections.indexOf(section);
    this._sections.splice(index, 1);
  }

  get sections(): StudySection[] {
    return this._sections;
  }
}
