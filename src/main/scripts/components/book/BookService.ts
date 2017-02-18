import {Book} from "./Book";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {HttpClient} from "../common/HttpClient";
import {Config} from "../../config/Config";
import {Factory} from "../common/BasicFactory";
import {Logger} from "../common/logger/Logger";

export class BookService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: Factory<HttpClient>,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger(BookService);
    this._httpClient = _httpClientFactory.create();
  }

  public async fetchBooks(bibleId: string): Promise<Book[]> {
    const url = this._config.getBooksUrl(bibleId);
    const response = await this._httpClient.fetch(url);
    const books: Book[] = response.data || [];
    this._logger.debug("Loaded", books.length, "books");
    return books;
  }
}
