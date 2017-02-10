import {BibleService} from "../bible/BibleService";
import {HttpClientFactory} from "./HttpClient";
import {BookService} from "../book/bookService";
import {ChapterService} from "../chapter/chapterService";
import {LoggerFactory} from "./loggerFactory";
import {VerseService} from "../verse/verseService";

export class ServiceContainer {
  private _httpClientFactory: HttpClientFactory;
  private _bibleService: BibleService;
  private _bookService: BookService;
  private _chapterService: ChapterService;
  private _verseService: VerseService;
  private _loggerFactory: LoggerFactory;

  public getHttpClientFactory(): HttpClientFactory {
    if (!this._httpClientFactory) {
      this._httpClientFactory = new HttpClientFactory();
    }
    return this._httpClientFactory;
  }

  public getLoggerFactory(): LoggerFactory {
    if (!this._loggerFactory) {
      this._loggerFactory = new LoggerFactory();
    }
    return this._loggerFactory;
  }

  public getBibleService(): BibleService {
    if (!this._bibleService) {
      this._bibleService = new BibleService(this.getHttpClientFactory());
    }
    return this._bibleService;
  }

  public getBookService(): BookService {
    if (!this._bookService) {
      this._bookService = new BookService(this.getHttpClientFactory(), this.getLoggerFactory());
    }
    return this._bookService;
  }

  public getChapterService(): ChapterService {
    if (!this._chapterService) {
      this._chapterService = new ChapterService(this.getHttpClientFactory(), this.getLoggerFactory());
    }
    return this._chapterService;
  }

  public getVerseService(): VerseService {
    if (!this._verseService) {
      this._verseService = new VerseService(this.getHttpClientFactory(), this.getLoggerFactory());
    }
    return this._verseService;
  }
}
