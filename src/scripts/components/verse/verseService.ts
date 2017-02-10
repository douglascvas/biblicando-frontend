import {Logger, LoggerFactory} from "../common/loggerFactory";
import {Verse} from "./verse";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";

export class VerseService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public fetchVerses(chapter) {
    var time = (new Date()).getTime();
    return this._httpClient.fetch(`api/v1/chapter/${chapter._id}/verses?time=${time}`)
      .then(httpResponse => httpResponse.json())
      .then((verses: Verse[]) => {
        this._logger.debug("Loaded", (verses || []).length, "verses");
        return verses;
      });
  }
}
