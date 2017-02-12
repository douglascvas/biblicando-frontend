import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Chapter} from "../chapter/Chapter";
import {Verse} from "../verse/verse";
import {Observer} from "../common/observer";

export class SectionContext {
  private _bibles: Bible[];
  private _biblesChangedObserver: Observer<Bible[]>;
  private _currentBible: Bible;

  private _books: Book[];
  private _booksChangedObserver: Observer<Book[]>;
  private _currentBook: Book;

  private _chapters: Chapter[];
  private _chaptersChangedObserver: Observer<Chapter[]>;
  private _currentChapter: Chapter;

  private _verses: Verse[];
  private _versesChangedObserver: Observer<Verse[]>;
  private _contextChangedObserver: Observer<SectionContext>;

  constructor() {
    this._bibles = [];
    this._books = [];
    this._chapters = [];
    this._verses = [];
    this._contextChangedObserver = new Observer();
    this._biblesChangedObserver = new Observer();
    this._booksChangedObserver = new Observer();
    this._chaptersChangedObserver = new Observer();
    this._versesChangedObserver = new Observer();
  }

  public setBibles(bibles: Bible[]): void {
    this._bibles = bibles || [];
    this._biblesChangedObserver.trigger(this._bibles);
    this.contextChanged();
  }

  public setBooks(books: Book[]): void {
    this._books = books || [];
    this._booksChangedObserver.trigger(this._books);
    this.contextChanged();
  }

  public setChapters(chapters: Chapter[]): void {
    this._chapters = chapters || [];
    this._chaptersChangedObserver.trigger(this._chapters);
    this.contextChanged();
  }

  public versestVerses(verses: Verse[]): void {
    this._verses = verses || [];
    this._versesChangedObserver.trigger(this._verses);
    this.contextChanged();
  }

  public setCurrentBible(currentBible: Bible): void {
    this._currentBible = currentBible;
    this.contextChanged();
  }

  public setCurrentBook(currentBook: Book): void {
    this._currentBook = currentBook;
    this.contextChanged();
  }

  public setCurrentChapter(currentChapter: Chapter): void {
    this._currentChapter = currentChapter;
    this.contextChanged();
  }

  public onContextChange(callback: (sectionContext: SectionContext) => void) {
    this._contextChangedObserver.subscribe(callback);
  }

  public onBiblesChange(callback: (bibles: Bible[]) => void) {
    this._biblesChangedObserver.subscribe(callback);
  }

  public onBooksChange(callback: (books: Book[]) => void) {
    this._booksChangedObserver.subscribe(callback);
  }

  public onChaptersChange(callback: (chapters: Chapter[]) => void) {
    this._chaptersChangedObserver.subscribe(callback);
  }

  public onVersesChange(callback: (verses: Verse[]) => void) {
    this._versesChangedObserver.subscribe(callback);
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

  private contextChanged() {
    this._contextChangedObserver.trigger();
  }

}
