import {HttpClient} from "~aurelia-http-client/dist/aurelia-http-client";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient)
export class BibleService {
  constructor(private httpClient:HttpClient) {
  }

  public fetchBibles() {
    return this.httpClient.get('api/v1/bibles?time=' + (new Date()).getTime())
      .then(httpResponse => {
        return JSON.parse(httpResponse.response) || [];
      });
  }
}