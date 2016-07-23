import {autoinject} from "aurelia-dependency-injection";
import {customElement, View} from "aurelia-templating";
import {BiblePage} from "../../bible/biblePage/biblePage";
import {BibleService} from "../../bible/bibleService";
import {BookService} from "../../book/bookService";
import {ChapterService} from "../../chapter/chapterService";
import {VerseService} from "../../verse/verseService";
import {LoggerFactory, Logger} from "../../common/loggerFactory";
import {Bible} from "../../bible/bible";

@autoinject
@customElement('bible-study')
export class BibleStudyComponent {
  private _logger:Logger;
  public pages:BiblePage[];

  constructor(private _bibleService:BibleService,
              private _bookService:BookService,
              private _chapterService:ChapterService,
              private _verseService:VerseService,
              private _loggerFactory:LoggerFactory) {
    this._initialize();
    this._logger = _loggerFactory.getLogger('BibleStudyComponent')
  }

  public created(owningView:View, myView:View) {
    this._logger.debug('Element created');
    this._loadBibles();
  }

  private _loadBibles() {
    return this._bibleService.fetchBibles()
      .then(bibles => this._updateBiblesOnPages(bibles));
  }

  private _updateBiblesOnPages(bibles:Bible[]):void {
    this.pages.forEach(page=>page.updateBibles(bibles))
  }

  private _createPage():BiblePage {
    return new BiblePage(this._bookService, this._chapterService, this._verseService, this._loggerFactory);
  }

  private _initialize() {
    this.pages = [this._createPage()];
  }
}