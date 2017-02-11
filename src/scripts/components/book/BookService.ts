import {Book} from "./Book";
import {LoggerFactory, Logger} from "../common/loggerFactory";
import {HttpClient, HttpClientFactory} from "../common/HttpClient";
import {Config} from "../../config/config";

export class BookService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('BookService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public fetchBooks(bible) {
    const self = this;
    const url = this._config.getBooksUrl(bible._id);
    return self._httpClient.fetch(url)
      .then((httpResponse: any) => httpResponse.json())
      .then((books: Book[]) => {
        this._logger.debug("Loaded", (books || []).length, "books");
        return books;
      });
  }
}
