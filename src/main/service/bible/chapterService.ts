import {HttpClient} from "~aurelia-http-client/dist/aurelia-http-client";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient)
export class ChapterService {
  constructor(private httpClient:HttpClient) {
  }

  public fetchChapters(book) {
    var time = (new Date()).getTime();
    return this.httpClient.get(`api/v1/book/${book._id}/chapters?time=${time}`)
      .then(httpResponse => {
        const chapters = JSON.parse(httpResponse.response);
        console.log("Loaded", (chapters || []).length, "chapters");
        return chapters;
      });
  }
}