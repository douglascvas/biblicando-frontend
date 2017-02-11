import {Bible} from "../Bible";
import {Book} from "../../book/Book";
import {Chapter} from "../../chapter/chapter";
import {Logger} from "../../common/loggerFactory";
import {Verse} from "../../verse/verse";
import {MenuBar} from "../../menuBar/MenuBar";
import {Observer} from "../../common/observer";
import {StoreContainer} from "../../common/StoreContainer";
import {ServiceContainer} from "../../common/ServiceContainer";

export class StudySection {
  private _continousMode: boolean;
  private _continousModeChangeObserver: Observer<boolean>;

  private _currentBible: Bible;
  private _currentBook: Book;
  private _currentChapter: Chapter;
  private _currentVerses: Verse[];
  private _menuBar: MenuBar;

  private _logger: Logger;
  private _pageId: string;

  constructor(private _storeContainer: StoreContainer,
              private _serviceContainer: ServiceContainer,) {

    this._logger = _serviceContainer.getLoggerFactory().getLogger('biblePage');
    this._pageId = new Date().getTime().toString();

    this._menuBar = new MenuBar(_storeContainer, _serviceContainer);
    this._menuBar.onBibleSelect(bible => this.selectBible(bible));
    this._menuBar.onBookSelect(book => this.selectBook(book));
    this._menuBar.onChapterSelect(chapter => this.selectChapter(chapter));

    this._continousModeChangeObserver = new Observer();
  }

  public switchDisplayMode(): void {
    this._continousMode = !this._continousMode;
    this._continousModeChangeObserver.trigger(this._continousMode);
  }

  public onContinousModeChange(callback: (boolean) => void) {
    this._continousModeChangeObserver.subscribe(callback);
  }

  /**
   * Bible
   */
  public updateBibles(bibles: Bible[]) {
    // this._bibles = bibles;
    this._logger.debug(`Updated ${bibles.length} bibles for page ${this._pageId}.`);
    // this.menuBar.updateBibles(bibles);
    this._currentBible = bibles[0];
    return this.loadBooks(bibles[0]);
  }

  private selectBible(bible: Bible) {
    if (!this.canSelectBible(bible)) {
      return;
    }
    this._logger.debug("Selected bible ", bible._id);
    this.loadBooks(bible)
      .then(() => this.setSelectedBible(bible));
  }

  private canSelectBible(bible: Bible) {
    return !this._currentBible || !bible || (this._currentBible._id !== bible._id);
  }

  private loadBooks(bible) {
    const self = this;
    return self._serviceContainer.getBookService().fetchBooks(bible)
      .then((books: Book[]) => {
        bible.books = books;
        // self.menuBar.updateBooks(books);
        self._currentBook = (books || [])[0];
        let chapters = (self._currentBook || <Book>{}).chapters || [];
        self._logger.debug(`Loaded ${chapters.length} chapters.`);
        // self.menuBar.updateChapters(chapters);
        self._currentChapter = chapters[0] || <Chapter>{};
        self._currentVerses = self._currentChapter.verses || [];
      });
  }

  private setSelectedBible(bible: Bible) {
    this._currentBible = bible;
  }

  /**
   * Book
   */

  private selectBook(book: Book) {
    if (!this.canSelectBook(book)) {
      return;
    }
    this._logger.debug("Loading book ", book._id);
    this.loadChapters(book)
      .then(() => this.setSelectedBook(book));
  }

  private canSelectBook(book) {
    return !(!book || (this._currentBook && book && this._currentBook._id === book._id));
  }

  // TODO: check if chapters already exist and if so, use it instead of fetching again
  private loadChapters(book) {
    const self = this;
    return self._serviceContainer.getChapterService().fetchChapters(book)
      .then(chapters => {
        book.chapters = chapters;
        // self.menuBar.updateChapters(chapters);
        self._currentChapter = (chapters || [])[0];
        self._currentVerses = (self._currentChapter || <Chapter>{}).verses || [];
        return chapters;
      });
  }

  private setSelectedBook(book: Book) {
    this._currentBook = book;
  }

  /**
   * Chapter
   */

  private selectChapter(chapter: Chapter) {
    if (!this.canSelectChapter(chapter)) {
      return;
    }
    this._logger.debug("Loading chapter ", chapter._id);
    this.loadVerses(chapter)
      .then(() => this.setSelectedChapter(chapter));
  }

  private canSelectChapter(chapter) {
    return !(!chapter || (this._currentChapter && chapter && this._currentChapter._id === chapter._id));
  }

  private loadVerses(chapter) {
    const self = this;
    return self._serviceContainer.getVerseService().fetchVerses(chapter)
      .then(verses => {
        chapter.verses = verses;
        self._currentChapter = chapter;
        self._currentVerses = (self._currentChapter || <Chapter>{}).verses || [];
        return verses;
      });
  }

  private setSelectedChapter(chapter: Chapter) {
    this._currentChapter = chapter;
  }

  get continousMode(): boolean {
    return this._continousMode;
  }

  get currentBible(): Bible {
    return this._currentBible;
  }

  get currentBook(): Book {
    return this._currentBook;
  }

  get currentChapter(): Chapter {
    return this._currentChapter;
  }

  get currentVerses(): Verse[] {
    return this._currentVerses;
  }

  get menuBar(): MenuBar {
    return this._menuBar;
  }

  get pageId(): string {
    return this._pageId;
  }
}
