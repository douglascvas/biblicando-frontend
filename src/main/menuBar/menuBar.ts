import {BibleMenu} from "../bible/bibleMenu/bibleMenu";
import {BookMenu} from "../book/bookMenu/bookMenu";
import {ChapterMenu} from "../chapter/chapterMenu/chapterMenu";
import {Bible} from "../bible/bible";
import {Book} from "../book/book";
import {Chapter} from "../chapter/chapter";
import {Logger, LoggerFactory} from "../common/loggerFactory";
import {Overlay} from "../common/overlay";
import {Observer} from "../common/observer";

export class MenuBar {
  public overlay:Overlay;
  public bibleMenu:BibleMenu;
  public bookMenu:BookMenu;
  public chapterMenu:ChapterMenu;
  private _logger:Logger;

  private _onBibleSelectObserver:Observer<Bible>;
  private _onBookSelectObserver:Observer<Book>;
  private _onChapterSelectObserver:Observer<Chapter>;

  constructor(private _loggerFactory:LoggerFactory) {
    this._logger = _loggerFactory.getLogger('MenuBar');

    this.overlay = new Overlay();
    this.bibleMenu = new BibleMenu(this.overlay, this._loggerFactory);
    this.bookMenu = new BookMenu(this.overlay, this._loggerFactory);
    this.chapterMenu = new ChapterMenu(this.overlay, this._loggerFactory);

    this._onBibleSelectObserver = new Observer();
    this._onBookSelectObserver = new Observer();
    this._onChapterSelectObserver = new Observer();

    this.bibleMenu.onSelect(bible=>this._selectBible(bible));
    this.bookMenu.onSelect(book=>this._selectBook(book));
    this.chapterMenu.onSelect(chapter=>this._selectBible(chapter));
  }

  private _hideAll() {
    this.bibleMenu.hide();
    this.bookMenu.hide();
    this.chapterMenu.hide();
  }

  private _selectBible(bible:Bible) {
    this._hideAll();
    this._onBibleSelectObserver.trigger(bible);
  }

  private _selectBook(book:Book) {
    this._hideAll();
    this._onBookSelectObserver.trigger(book);
  }

  private _selectChapter(chapter:Chapter) {
    this._hideAll();
    this._onChapterSelectObserver.trigger(chapter);
  }

  public updateBibles(bibles:Bible[]) {
    this.bibleMenu.update(bibles);
  }

  public updateBooks(books:Book[]) {
    this.bookMenu.update(books);
  }

  public updateChapters(chapters:Chapter[]) {
    this.chapterMenu.update(chapters);
  }

  public onBibleSelect(listener:(Bible)=>void) {
    this._onBibleSelectObserver.observe(listener);
  }

  public onBookSelect(listener:(Book)=>void) {
    this._onBookSelectObserver.observe(listener);
  }

  public onChapterSelect(listener:(Chapter)=>void) {
    this._onChapterSelectObserver.observe(listener);
  }

}