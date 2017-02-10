import {Book} from "./book";
import {LoggerFactory, Logger} from "../common/loggerFactory";
import {HttpClient, HttpClientFactory} from "../common/HttpClient";

export class BookService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('BookService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public fetchBooks(bible) {
    var self = this;
    var time = (new Date()).getTime();
    return self._httpClient.fetch(`api/v1/bible/${bible._id}/books?time=${time}`)
      .then((httpResponse: any) => httpResponse.json())
      .then((books: Book[]) => {
        this._logger.debug("Loaded", (books || []).length, "books");
        return books;
      });
  }
}
