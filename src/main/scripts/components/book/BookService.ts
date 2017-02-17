import {Book} from "./Book";
import {LoggerFactory, Logger} from "../common/LoggerFactory";
import {HttpClient, HttpClientFactory} from "../common/HttpClient";
import {Config} from "../../config/Config";
import {Bible} from "../bible/Bible";

export class BookService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('BookService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public async fetchBooks(bible: Bible): Promise<Book[]> {
    const url = this._config.getBooksUrl(bible._id);
    const response = await this._httpClient.fetch(url);
    const books: Book[] = response.data || [];
    this._logger.debug("Loaded", books.length, "books");
    return books;
  }
}
