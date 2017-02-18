import {Chapter} from "./Chapter";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {Config} from "../../config/Config";
import {Logger} from "../common/logger/Logger";

export class ChapterService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('ChapterService');
    this._httpClient = _httpClientFactory.create();
  }

  public async fetchChapters(bookId: string): Promise<Chapter[]> {
    const url = this._config.getChaptersUrl(bookId);
    const response = await this._httpClient.fetch(url);
    const chapters: Chapter[] = response.data || [];
    this._logger.debug("Loaded", chapters.length, "chapters");
    return chapters;
  }
}
