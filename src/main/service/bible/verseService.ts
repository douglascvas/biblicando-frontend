import {HttpClient} from "~aurelia-http-client/dist/aurelia-http-client";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient)
export class VerseService {
  constructor(private httpClient:HttpClient) {
  }

  public fetchVerses(chapter) {
    var time = (new Date()).getTime();
    return this.httpClient.get(`api/v1/chapter/${chapter._id}/verses?time=${time}`)
      .then(httpResponse => {
        const verses = JSON.parse(httpResponse.response);
        console.log("Loaded", (verses || []).length, "verses");
        return verses;
      });
  }
}