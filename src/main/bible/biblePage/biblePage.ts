import {Bible} from "../bible";
import {Book} from "../../book/book";
import {Chapter} from "../../chapter/chapter";
import {Logger, LoggerFactory} from "../../common/loggerFactory";
import {BookService} from "../../book/bookService";
import {ChapterService} from "../../chapter/chapterService";
import {VerseService} from "../../verse/verseService";
import {Verse} from "../../verse/verse";
import {MenuBar} from "../../menuBar/menuBar";

export class BiblePage {
  public currentBible:Bible;
  public currentBook:Book;
  public currentChapter:Chapter;
  public currentVerses:Verse[];
  public menuBar:MenuBar;

  private _logger:Logger;
  private _bibles:Bible[];
  private _pageId:string;

  constructor(private _bookService:BookService,
              private _chapterService:ChapterService,
              private _verseService:VerseService,
              private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('biblePage');
    this._pageId = new Date().getTime().toString();
    this.menuBar = new MenuBar(_loggerFactory);

    this.menuBar.onBibleSelect(bible=>this._selectBible(bible));
    this.menuBar.onBookSelect(book=>this._selectBook(book));
    this.menuBar.onChapterSelect(book=>this._selectChapter(book));
  }

  /**
   * Bible
   */

  public updateBibles(bibles:Bible[]) {
    this._bibles = bibles;
    this._logger.debug(`Updated ${bibles.length} bibles for page ${this._pageId}.`);
    this.menuBar.updateBibles(bibles);
    return this._loadBooks(bibles[0]);
  }

  private _selectBible(bible:Bible) {
    if (!this._canSelectBible(bible)) {
      return;
    }
    this._logger.debug("Selected bible ", bible._id);
    this._loadBooks(bible)
      .then(()=>this._setSelectedBible(bible));
  }

  private _canSelectBible(bible:Bible) {
    return !(!bible || (this.currentBible && bible && this.currentBible._id === bible._id));
  }

  private _loadBooks(bible) {
    var self = this;
    return self._bookService.fetchBooks(bible)
      .then((books:Book[]) => {
        bible.books = books;
        self.menuBar.updateBooks(books);
        self.currentBook = (books || [])[0];
        let chapters = (self.currentBook || <Book>{}).chapters || [];
        self._logger.debug(`Loaded ${chapters.length} chapters.`);
        self.menuBar.updateChapters(chapters);
        self.currentChapter = chapters[0] || <Chapter>{};
        self.currentVerses = self.currentChapter.verses || [];
      });
  }

  private _setSelectedBible(bible:Bible) {
    this.currentBible = bible;
  }

  /**
   * Book
   */

  private _selectBook(book:Book) {
    if (!this._canSelectBook(book)) {
      return;
    }
    this._logger.debug("Loading book ", book._id);
    this._loadChapters(book)
      .then(()=>this._setSelectedBook(book));
  }

  private _canSelectBook(book) {
    return !(!book || (this.currentBook && book && this.currentBook._id === book._id));
  }

  // TODO: check if chapters already exist and if so, use it instead of fetching again
  private _loadChapters(book) {
    var self = this;
    return self._chapterService.fetchChapters(book)
      .then(chapters => {
        book.chapters = chapters;
        self.menuBar.updateChapters(chapters);
        self.currentChapter = (chapters || [])[0];
        self.currentVerses = (self.currentChapter || <Chapter>{}).verses || [];
        return chapters;
      });
  }

  private _setSelectedBook(book:Book) {
    this.currentBook = book;
  }

  /**
   * Chapter
   */

  private _selectChapter(chapter:Chapter) {
    if (!this._canSelectChapter(chapter)) {
      return;
    }
    this._logger.debug("Loading chapter ", chapter._id);
    this._loadVerses(chapter)
      .then(()=>this._setSelectedChapter(chapter));
  }

  private _canSelectChapter(chapter) {
    return !(!chapter || (this.currentChapter && chapter && this.currentChapter._id === chapter._id));
  }

  private _loadVerses(chapter) {
    var self = this;
    return self._verseService.fetchVerses(chapter)
      .then(verses => {
        chapter.verses = verses;
        self.currentVerses = (self.currentChapter || <Chapter>{}).verses || [];
        return verses;
      });
  }

  private _setSelectedChapter(chapter:Chapter) {
    this.currentChapter = chapter;
  }

}