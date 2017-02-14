import {Chapter} from "./Chapter";
import {LoggerFactory, Logger} from "../common/loggerFactory";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {Book} from "../book/Book";
import {Config} from "../../config/config";

export class ChapterService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public async fetchChapters(book: Book): Promise<Chapter[]> {
    const url = this._config.getChaptersUrl(book._id);
    const response = await this._httpClient.fetch(url);
    const chapters: Chapter[] = response.data || [];
    this._logger.debug("Loaded", chapters.length, "chapters");
    return chapters;
  }
}
