import {Logger, LoggerFactory} from "../common/loggerFactory";
import {Verse} from "./Verse";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {Config} from "../../config/Config";
import {Chapter} from "../chapter/Chapter";

export class VerseService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger('VerseService');
    this._httpClient = _httpClientFactory.createClient();
  }

  public async fetchVerses(chapter: Chapter): Promise<Verse[]> {
    const url = this._config.getVersesUrl(chapter._id);
    const response = await this._httpClient.fetch(url);
    const verses: Verse[] = response.data || [];
    this._logger.debug("Loaded", verses.length, "verses");
    return verses;
  }
}
