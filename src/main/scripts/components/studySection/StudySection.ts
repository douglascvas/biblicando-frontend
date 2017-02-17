import {SectionContext} from "./SectionContext";
import {Observer} from "../common/Observer";
import {Bible} from "../bible/Bible";
import {Book} from "../book/Book";
import {Verse} from "../verse/Verse";
import {Logger} from "../common/LoggerFactory";
import {ServiceContainer} from "../common/ServiceContainer";
import {StudySectionMenu} from "./menu/StudySectionMenu";
import {Chapter} from "../chapter/Chapter";
import {BookService} from "../book/BookService";
import {ChapterService} from "../chapter/ChapterService";
import {VerseService} from "../verse/VerseService";
import {VerseList} from "../verse/verseList/VerseList";
import {BibleStore} from "../bible/BibleStore";
import {Factory} from "../common/BasicFactory";

export class StudySection {
  private _logger: Logger;
  private _sectionContext: SectionContext;

  private _continousMode: boolean;
  private _continousModeChangeObserver: Observer<boolean>;

  private _studySectionMenu: StudySectionMenu;
  private _unregisterFunctions: Function[];

  private _verseList: VerseList;

  constructor(private _bibleStore: BibleStore,
              private _sectionContextFactory: Factory<SectionContext>,
              private _studySectionMenuFactory: Factory<StudySectionMenu>,
              private _serviceContainer: ServiceContainer) {
    this._logger = _serviceContainer.getLoggerFactory().getLogger('StudySection');

    this._unregisterFunctions = [];
    this.createSectionContext();
    this.createStudySectionMenu(_serviceContainer);
    this.createVerseList();
    this.setupContinuousMode();
  }

  public unregister(): void {
    this._unregisterFunctions.forEach(fn => fn());
  }

  public switchDisplayMode(): Promise<void> {
    this._continousMode = !this._continousMode;
    return this._continousModeChangeObserver.trigger(this._continousMode);
  }

  public onContinousModeChange(callback: (boolean) => void): Function {
    return this._continousModeChangeObserver.subscribe(callback);
  }

  public onVersesChange(callback: (verses) => void): Function {
    return this._sectionContext.onVersesChange(callback);
  }

  private setupContinuousMode() {
    this._continousMode = false;
    this._continousModeChangeObserver = new Observer();
  }

  private createStudySectionMenu(_serviceContainer: ServiceContainer) {
    this._studySectionMenu = this._studySectionMenuFactory.create();
    this._unregisterFunctions.push(() => this._studySectionMenu.unregister());
  }

  private createSectionContext(): void {
    this._sectionContext = this._sectionContextFactory.create();
    const onBiblesChangeUnregister = this._bibleStore.onChange(bibles => this.biblesChanged(bibles));
    const onCurrentBibleChangeUnregister = this._sectionContext.onCurrentBibleChange((newBible) => this.currentBibleChanged(newBible));
    const onCurrentBookChangeUnregister = this._sectionContext.onCurrentBookChange((newBook, oldBook) => this.currentBookChanged(newBook, oldBook));
    const onCurrentChapterChangeUnregister = this._sectionContext.onCurrentChapterChange((newChapter) => this.currentChapterChanged(newChapter));
    this._unregisterFunctions.push(onCurrentBibleChangeUnregister, onCurrentBookChangeUnregister,
      onCurrentChapterChangeUnregister, onBiblesChangeUnregister);
  }

  private createVerseList(): void {
    this._verseList = new VerseList(this._sectionContext);
  }

  /**
   * Bible
   */
  private currentBibleChanged(bible: Bible): void {
    this.loadBooks(bible);
  }

  private async biblesChanged(bibles: Bible[]): Promise<void> {
    bibles = bibles || [];
    const currentBible = this._sectionContext.currentBible;
    await this._sectionContext.setBibles(bibles);
    if (!currentBible) {
      await this._sectionContext.setCurrentBible(bibles[0]);
    }
  }

  private async loadBooks(bible: Bible): Promise<void> {
    this._logger.debug("Loading books for bible ", bible._id);
    const bookService: BookService = this._serviceContainer.getBookService();
    const newBooks: Book[] = (bible.books && bible.books.length) ? bible.books : await bookService.fetchBooks(bible);
    bible.books = newBooks;

    const lastBook = this._sectionContext.currentBook;
    const lastBookNumber: number = lastBook ? lastBook.number : 1;
    const newBook = newBooks.find(book => (book.number === lastBookNumber));

    await this._sectionContext.setBooks(newBooks || []);
    await this._sectionContext.setCurrentBook(newBook);
  }

  /**
   * Book
   */
  private currentBookChanged(newBook: Book, lastBook: Book): Promise<void> {
    return this.loadChapters(newBook, this.shouldPreserveChapter(newBook, lastBook));
  }

  private shouldPreserveChapter(newBook: Book, lastBook: Book): boolean {
    return newBook && lastBook &&
      ((newBook.number && newBook.number === lastBook.number) || (newBook.abbreviation && newBook.abbreviation === newBook.abbreviation));
  }

  private async loadChapters(book: Book, preserveChapter?: boolean): Promise<void> {
    this._logger.debug("Loading chapters for book ", book._id);
    const chapterService: ChapterService = this._serviceContainer.getChapterService();
    const newChapters: Chapter[] = (book.chapters && book.chapters.length) ? book.chapters : await chapterService.fetchChapters(book);

    book.chapters = newChapters;
    if (!newChapters.length) {
      this._logger.debug(`No chapters found for book ${book._id}`);
      return;
    }

    let newChapter = newChapters[0];
    if (preserveChapter) {
      const lastChapter = this._sectionContext.currentChapter;
      if (lastChapter && book.numberOfChapters >= lastChapter.number) {
        newChapter = newChapters.find(chapter => chapter.number === lastChapter.number);
      }
    }

    await this._sectionContext.setChapters(newChapters);
    await this._sectionContext.setCurrentChapter(newChapter);
  }

  /**
   * Chapter
   */
  private currentChapterChanged(chapter: Chapter): Promise<void> {
    return this.loadVerses(chapter);
  }

  private async loadVerses(chapter: Chapter): Promise<void> {
    this._logger.debug("Loading verses for chapter ", chapter._id);
    const verseService: VerseService = this._serviceContainer.getVerseService();
    const newVerses: Verse[] = (chapter.verses && chapter.verses.length) ? chapter.verses : await verseService.fetchVerses(chapter);

    chapter.verses = newVerses;

    return this._sectionContext.setVerses(newVerses || []);
  }

  get continousMode(): boolean {
    return this._continousMode;
  }

  get studySectionMenu(): StudySectionMenu {
    return this._studySectionMenu;
  }

  get sectionContext(): SectionContext {
    return this._sectionContext;
  }

  get verseList(): VerseList {
    return this._verseList;
  }

  public getCurrentBible() {
    return this._sectionContext.currentBible;
  }

  public getCurrentBook() {
    return this._sectionContext.currentBook;
  }

  public getCurrentChapter() {
    return this._sectionContext.currentChapter;
  }


}
