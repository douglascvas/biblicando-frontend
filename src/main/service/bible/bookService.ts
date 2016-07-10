import {HttpClient} from "~aurelia-http-client/dist/aurelia-http-client";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient)
export class BookService {
  constructor(private httpClient:HttpClient) {
  }

  public fetchBooks(bible) {
    var self = this;
    var time = (new Date()).getTime();
    return self.httpClient.get(`api/v1/bible/${bible._id}/books?time=${time}`)
      .then(httpResponse => {
        const books = JSON.parse(httpResponse.response);
        console.log("Loaded", (books || []).length, "books");
        return books;
      });
  }
}