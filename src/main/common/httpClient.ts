import {HttpClient as AureliaClient} from "aurelia-fetch-client";
import "whatwg-fetch";

export class HttpClientFactory {
  public createClient():HttpClient {
    return new HttpClient()
  }
}

export class HttpClient extends AureliaClient {
}
