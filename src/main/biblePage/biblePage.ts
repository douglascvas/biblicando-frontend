import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";

@inject(HttpClient)
@customElement('bible-page')
export class BiblePage {
  @bindable version;
  public showBibleList;
  public bibles:Array<any>;
  @bindable selectedBible:any;
  @bindable selectedBook:any;
  @bindable selectedChapter:any;
  public verses:any[];

  public bibleSelection:Selectable;

  constructor(private httpClient:HttpClient) {

  }

  private loadBooks(bible) {
    var self = this;
    return self.httpClient.get(`api/v1/bible/${bible._id}/books`)
      .then(httpResponse => {
        bible.books = JSON.parse(httpResponse.response);
        console.log("Loaded", (bible.books || []).length, "books");
        self.selectedBible = bible;
        self.selectedBook = (bible.books || [])[0];
        self.selectedChapter = (self.selectedBook.chapters || [])[0];
        self.verses = (self.selectedChapter || {}).verses || [];
      });
  }

  private loadBibles() {
    console.log("Loading bibles...");
    var self = this;
    return self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        self.bibles = JSON.parse(httpResponse.response);
        console.log("Loaded", self.bibles.length, "bibles");
        if (self.bibles && self.bibles.length) {
          var bible = self.bibles[0];
          return self.loadBooks(bible);
        }
      });
  }

  public created() {
    const self = this;
    return this.loadBibles();
  }

  toggleBibleList() {
    this.showBibleList = !this.showBibleList;
  }

}