import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bible-page')
export class BiblePage {
  @bindable version;
  public showBibleList;
  public bibles:Array<any>;
  public selectedBible:any;

  constructor(private httpClient:HttpClient) {

  }

  private loadBooks(bible) {
    var self = this;
    self.httpClient.get(`api/v1/bible/${bible._id}/books`)
      .then(httpResponse => {
        bible.books = JSON.parse(httpResponse.response);
      });
  }

  private loadBibles() {
    var self = this;
    self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        self.bibles = JSON.parse(httpResponse.response);
        if (self.bibles && self.bibles.length) {
          var bible = self.bibles[0];
          return self.loadBooks(bible);
        }
      });
  }

  public created() {
    const self = this;
    this.loadBibles();
  }

  toggleBibleList() {
    this.showBibleList = !this.showBibleList;
  }

}