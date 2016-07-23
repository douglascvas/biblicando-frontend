import {autoinject} from "aurelia-dependency-injection";
import {HttpClientFactory, HttpClient} from "../common/httpClient";

@autoinject
export class BibleService {
  private _httpClient:HttpClient;

  constructor(private httpClientFactory:HttpClientFactory) {
    this._httpClient = httpClientFactory.createClient();
  }

  public fetchBibles() {
    return this._httpClient.fetch('api/v1/bibles?time=' + (new Date()).getTime())
      .then(httpResponse => {
        return httpResponse.json();
      });
  }
}