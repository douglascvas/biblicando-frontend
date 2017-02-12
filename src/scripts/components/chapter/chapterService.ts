import {Chapter} from "./Chapter";
import {LoggerFactory, Logger} from "../common/loggerFactory";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";

export class ChapterService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public fetchChapters(book) {
    var time = (new Date()).getTime();
    return this._httpClient.fetch(`api/v1/book/${book._id}/chapters?time=${time}`)
      .then(httpResponse => httpResponse.json())
      .then((chapters: Chapter[]) => {
        this._logger.debug("Loaded", (chapters || []).length, "chapters");
        return chapters;
      });
  }
}
