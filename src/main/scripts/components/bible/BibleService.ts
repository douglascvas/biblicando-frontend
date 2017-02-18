import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {Config} from "../../config/Config";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {Logger} from "../common/logger/Logger";
import {Bible} from "./Bible";

export class BibleService {
  private _logger: Logger;
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory,
              private _loggerFactory: LoggerFactory) {
    this._logger = _loggerFactory.getLogger(BibleService);
    this._httpClient = _httpClientFactory.create();
  }

  public async fetchBibles(): Promise<Bible[]> {
    const url = this._config.getBiblesUrl();
    const response = await this._httpClient.fetch(url);
    const bibles: Bible[] = response.data || [];
    this._logger.debug("Loaded", bibles.length, "bibles");
    return bibles;
  }
}
