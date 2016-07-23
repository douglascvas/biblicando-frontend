import {BibleMenu} from "../bibleMenu/bibleMenu";
import {BookMenu} from "../../book/bookMenu/bookMenu";
import {ChapterMenu} from "../../chapter/chapterMenu/chapterMenu";
import {Bible} from "../bible";
import {Book} from "../../book/book";
import {Chapter} from "../../chapter/chapter";
import {Logger, LoggerFactory} from "../../common/loggerFactory";
import {BookService} from "../../book/bookService";
import {ChapterService} from "../../chapter/chapterService";
import {VerseService} from "../../verse/verseService";
import {Verse} from "../../verse/verse";
import {Overlay} from "../../common/overlay";

export class BiblePage {
  public overlay:Overlay;
  public bibleMenu:BibleMenu;
  public bookMenu:BookMenu;
  public chapterMenu:ChapterMenu;

  private selectedBible:Bible;
  private selectedBook:Book;
  private selectedChapter:Chapter;
  private _verses:Verse[];
  private _logger:Logger;
  private _bibles:Bible[];
  private _pageId:string;

  constructor(private _bookService:BookService,
              private _chapterService:ChapterService,
              private _verseService:VerseService,
              private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('biblePage');
    this._pageId = new Date().getTime().toString();

    this.overlay = new Overlay();
    this.bibleMenu = new BibleMenu(this.overlay, this._loggerFactory);
    this.bookMenu = new BookMenu(this.overlay, this._loggerFactory);
    this.chapterMenu = new ChapterMenu(this.overlay, this._loggerFactory);

    this.bibleMenu.onSelect(bible=>this._onBibleSelect(bible));
    this.bookMenu.onSelect(bible=>this._onBookSelect(bible));
    this.chapterMenu.onSelect(bible=>this._onChapterSelect(bible));
  }

  public updateBibles(bibles:Bible[]) {
    this._bibles = bibles;
    this._logger.debug(`Updated ${bibles.length} bibles for page ${this._pageId}.`);
    this.bibleMenu.update(bibles);
    return this._loadBooks(bibles[0]);
  }

  private _onBibleSelect(bible) {
    this.bibleMenu.hide();
    this._logger.debug("Selected bible ", bible._id);
    if (!this._canSelectBible(bible)) {
      return;
    }
    this._loadBooks(bible)
      .then(()=>this._setSelectedBible(bible));
  }

  private _onBookSelect(book) {
    this.bookMenu.hide();
    if (this._canSelectBook(book)) {
      return;
    }
    this._logger.debug("Loading book ", book._id);
    this._loadChapters(book)
      .then(()=>this.selectedBook = book);
  }

  private _onChapterSelect(chapter) {
    this.chapterMenu.toggle();
    if (this._canSelectChapter(chapter)) {
      return;
    }
    this._logger.debug("Loading chapter ", chapter._id);
    this._loadVerses(chapter)
      .then(()=>this.selectedChapter = chapter);
  }

  private _canSelectBible(bible) {
    return !(!bible || (this.selectedBible && bible && this.selectedBible._id === bible._id));
  }

  private _canSelectBook(book) {
    return !(!book || (this.selectedBook && book && this.selectedBook._id === book._id));
  }

  private _canSelectChapter(chapter) {
    return !(!chapter || (this.selectedChapter && chapter && this.selectedChapter._id === chapter._id));
  }

  private _setSelectedBible(bible) {
    this.selectedBible = bible;
  }

  // TODO: check if chapters already exist and if so, use it instead of fetching again
  private _loadChapters(book) {
    var self = this;
    return self._chapterService.fetchChapters(book)
      .then(chapters => {
        book.chapters = chapters;
        self.chapterMenu.update(chapters);
        self.selectedChapter = (chapters || [])[0];
        self._verses = (self.selectedChapter || <Chapter>{}).verses || [];
        return chapters;
      });
  }

  private _loadVerses(chapter) {
    var self = this;
    return self._verseService.fetchVerses(chapter)
      .then(verses => {
        chapter.verses = verses;
        self._verses = (self.selectedChapter || <Chapter>{}).verses || [];
        return verses;
      });
  }

  private _loadBooks(bible) {
    var self = this;
    return self._bookService.fetchBooks(bible)
      .then(books => {
        bible.books = books;
        self.bookMenu.update(books);
        self.selectedBook = (books || [])[0];
        self.chapterMenu.update((self.selectedBook || <Book>{}).chapters);
        self.selectedChapter = ((self.selectedBook || <Book>{}).chapters || [])[0] || <Chapter>{};
        self._verses = self.selectedChapter.verses || [];
      });
  }

}