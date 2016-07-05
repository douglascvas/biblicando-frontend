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

  constructor(private httpClient:HttpClient) {
    this.onBibleSelect = this.onBibleSelect.bind(this);
  }

  public onBibleSelect(bible) {
    this.toggleBibleList();
    console.log("Loading bible ", bible._id);
    if (!this.selectedBible || (bible && this.selectedBible._id && this.selectedBible._id !== bible._id)) {
      console.log("Loading books");
      this.loadBooks(bible);
    }
  }

  private loadBooks(bible) {
    var self = this;
    var time = (new Date()).getTime();
    return self.httpClient.get(`api/v1/bible/${bible._id}/books?time=${time}`)
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
    return self.httpClient.get('api/v1/bibles?time=' + (new Date()).getTime())
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

  public toggleBibleList() {
    this.showBibleList = !this.showBibleList;
  }

}