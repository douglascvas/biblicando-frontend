import {BibleMenu} from "../menu/bibleMenu";
import {BookMenu} from "../menu/bookMenu";
import {ChapterMenu} from "../menu/chapterMenu";
import {BibleService} from "../../service/bible/bibleService";
import {BookService} from "../../service/bible/bookService";
import {ChapterService} from "../../service/bible/chapterService";
import {VerseService} from "../../service/bible/verseService";

export class BiblePage {
  public bibleMenu:BibleMenu;
  public bookMenu:BookMenu;
  public chapterMenu:ChapterMenu;

  private selectedBible;
  private selectedBook;
  private selectedChapter;
  private verses:any[];

  constructor(private bibleService:BibleService,
              private bookService:BookService,
              private chapterService:ChapterService,
              private verseService:VerseService) {
    this._initialize();
  }

  private _initialize() {
    this.bibleMenu = new BibleMenu();
    this.bookMenu = new BookMenu();
    this.chapterMenu = new ChapterMenu();

    this.bibleMenu.onSelect(bible=>this.onBibleSelect(bible));
    this.bookMenu.onSelect(bible=>this.onBookSelect(bible));
    this.chapterMenu.onSelect(bible=>this.onChapterSelect(bible));

  }

  public onBibleSelect(bible) {
    this.bibleMenu.toggle();
    console.log("Selected bible ", bible._id);
    if (!bible || (this.selectedBible && bible && this.selectedBible._id === bible._id)) {
      return;
    }
    this.loadBooks(bible)
      .then(()=>this.selectedBible = bible);
  }

  private loadBooks(bible) {
    var self = this;
    return self.bookService.fetchBooks(bible)
      .then(books => {
        bible.books = books;
        self.selectedBook = (books || [])[0];
        self.selectedChapter = (self.selectedBook.chapters || [])[0] || {};
        self.verses = self.selectedChapter.verses || [];
      });
  }

  public onBookSelect(book) {
    this.bookMenu.toggle();
    if (!book || (this.selectedBook && book && this.selectedBook._id === book._id)) {
      return;
    }
    console.log("Loading book ", book._id);
    this.loadChapters(book)
      .then(()=>this.selectedBook = book);
  }

  // TODO: check if chapters already exist and if so, use it instead of fetching again
  private loadChapters(book) {
    var self = this;
    return self.chapterService.fetchChapters(book)
      .then(chapters => {
        self.chapterMenu.update(chapters);
        book.chapters = chapters;
        self.selectedChapter = (chapters || [])[0];
        self.verses = (self.selectedChapter || {}).verses || [];
        return chapters;
      });
  }

  public onChapterSelect(chapter) {
    this.chapterMenu.toggle();
    if (!chapter || (this.selectedChapter && chapter && this.selectedChapter._id === chapter._id)) {
      return;
    }
    console.log("Loading chapter ", chapter._id);
    this.loadVerses(chapter)
      .then(()=>this.selectedChapter = chapter);
  }

  private loadVerses(chapter) {
    var self = this;
    return self.verseService.fetchVerses(chapter)
      .then(verses => {
        chapter.verses = verses;
        self.verses = (self.selectedChapter || {}).verses || [];
        return verses;
      });
  }

  private loadBibles() {
    var self = this;
    return self.bibleService.fetchBibles()
      .then(bibles => {
        self.bibleMenu.update(bibles);
        console.log(`Loaded ${bibles.length} bibles.`);
        if (bibles && bibles.length) {
          return self.loadBooks(bibles[0]);
        }
      });
  }

}