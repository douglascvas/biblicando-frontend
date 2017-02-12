import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {Config} from "../../config/config";

export class BibleService {
  private _httpClient: HttpClient;

  constructor(private _config: Config,
              private _httpClientFactory: HttpClientFactory) {
    this._httpClient = _httpClientFactory.createClient();
  }

  public fetchBibles() {
    return this._httpClient.fetch(this._config.getBiblesUrl())
      .then(response => {
        return response.data;
      });
  }
}
