import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Chapter} from "../chapter/Chapter";
import {Verse} from "../verse/Verse";
import {Observer} from "../common/Observer";
import {Logger, LoggerFactory} from "../common/LoggerFactory";

export class SectionContext {
  private _bibles: Bible[];
  private _biblesChangeObserver: Observer<Bible[]>;

  private _currentBible: Bible;
  private _currentBibleChangeObserver: Observer<Bible>;

  private _books: Book[];
  private _booksChangeObserver: Observer<Book[]>;

  private _currentBook: Book;
  private _currentBookChangeObserver: Observer<Book>;

  private _chapters: Chapter[];
  private _chaptersChangeObserver: Observer<Chapter[]>;

  private _currentChapter: Chapter;
  private _currentChapterChangeObserver: Observer<Chapter>;

  private _verses: Verse[];
  private _versesChangeObserver: Observer<Verse[]>;
  private _contextChangeObserver: Observer<SectionContext>;

  private _logger: Logger;

  constructor(_loggerFactory: LoggerFactory) {
    this._bibles = [];
    this._biblesChangeObserver = new Observer();
    this._currentBibleChangeObserver = new Observer();

    this._books = [];
    this._booksChangeObserver = new Observer();
    this._currentBookChangeObserver = new Observer();

    this._chapters = [];
    this._chaptersChangeObserver = new Observer();
    this._currentChapterChangeObserver = new Observer();

    this._verses = [];
    this._contextChangeObserver = new Observer();
    this._versesChangeObserver = new Observer();

    this._logger = _loggerFactory.getLogger('SectionContext');
  }

  public async setBibles(bibles: Bible[]): Promise<void> {
    this._bibles = bibles || [];
    this._logger.debug(`Bibles changed. New bibles length:`, bibles.length);
    await this._biblesChangeObserver.trigger(this._bibles);
    return this.contextChanged();
  }

  public async setBooks(books: Book[]): Promise<void> {
    this._books = books || [];
    this._logger.debug(`Books changed. New books length:`, books.length);
    await this._booksChangeObserver.trigger(this._books);
    return this.contextChanged();
  }

  public async setChapters(chapters: Chapter[]): Promise<void> {
    this._chapters = chapters || [];
    this._logger.debug(`Chapters changed. New chapters length:`, chapters.length);
    await this._chaptersChangeObserver.trigger(this._chapters);
    return this.contextChanged();
  }

  public async setVerses(verses: Verse[]): Promise<void> {
    this._verses = verses || [];
    this._logger.debug(`Verses changed. New verses length:`, verses.length);
    await this._versesChangeObserver.trigger(this._verses);
    return this.contextChanged();
  }

  public async setCurrentBible(currentBible: Bible): Promise<void> {
    if (!currentBible || currentBible === this.currentBible) {
      return;
    }
    const lastBible = this._currentBible;
    this._currentBible = currentBible;
    this._logger.debug(`Current bible changed from ${lastBible ? lastBible._id : null} to ${currentBible._id}.`);
    await this._currentBibleChangeObserver.trigger(currentBible, lastBible);
    return this.contextChanged();
  }

  public setCurrentBook(currentBook: Book): Promise<void> {
    if (!currentBook || currentBook === this.currentBook) {
      return;
    }
    const lastBook: Book = this._currentBook;
    this._currentBook = currentBook;
    this._logger.debug(`Current book changed from ${lastBook ? lastBook._id : null} to ${currentBook._id}.`);
    this._currentBookChangeObserver.trigger(currentBook, lastBook);
    return this.contextChanged();
  }

  public setCurrentChapter(currentChapter: Chapter): Promise<void> {
    if (!currentChapter || currentChapter === this.currentChapter) {
      return;
    }
    const lastChapter: Chapter = this._currentChapter;
    this._currentChapter = currentChapter;
    this._logger.debug(`Current chapter changed from ${lastChapter ? lastChapter._id : null} to ${currentChapter._id}.`);
    this._currentChapterChangeObserver.trigger(currentChapter, lastChapter);
    return this.contextChanged();
  }

  public onContextChange(callback: (sectionContext: SectionContext) => void): Function {
    return this._contextChangeObserver.subscribe(callback);
  }

  public onBiblesChange(callback: (bibles: Bible[]) => void): Function {
    return this._biblesChangeObserver.subscribe(callback);
  }

  public onCurrentBibleChange(callback: (newBible: Bible, oldBible?: Bible) => void): Function {
    return this._currentBibleChangeObserver.subscribe(callback);
  }

  public onBooksChange(callback: (books: Book[]) => void): Function {
    return this._booksChangeObserver.subscribe(callback);
  }

  public onCurrentBookChange(callback: (newBook: Book, oldBook?: Book) => void): Function {
    return this._currentBookChangeObserver.subscribe(callback);
  }

  public onChaptersChange(callback: (chapters: Chapter[]) => void): Function {
    return this._chaptersChangeObserver.subscribe(callback);
  }

  public onCurrentChapterChange(callback: (newChapter: Chapter, oldChapter?: Chapter) => void): Function {
    return this._currentChapterChangeObserver.subscribe(callback);
  }

  public onVersesChange(callback: (verses: Verse[]) => void): Function {
    return this._versesChangeObserver.subscribe(callback);
  }

  get bibles(): Bible[] {
    return this._bibles;
  }

  get currentBible(): Bible {
    return this._currentBible;
  }

  get books(): Book[] {
    return this._books;
  }

  get currentBook(): Book {
    return this._currentBook;
  }

  get chapters(): Chapter[] {
    return this._chapters;
  }

  get currentChapter(): Chapter {
    return this._currentChapter;
  }

  get verses(): Verse[] {
    return this._verses;
  }

  private contextChanged(): Promise<void> {
    return this._contextChangeObserver.trigger();
  }

}
