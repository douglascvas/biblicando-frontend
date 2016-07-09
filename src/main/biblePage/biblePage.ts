import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
@customElement('bible-page')
export class BiblePageVM {
  @bindable version;
  public showBibleList;
  public showBookList;
  public bibles:Array<any>;
  @bindable selectedBible:any;
  @bindable selectedBook:any;
  @bindable selectedChapter:any;
  public verses:any[];

  constructor(private httpClient:HttpClient) {
    this.onBibleSelect = this.onBibleSelect.bind(this);
  }

  public onBookSelect(book) {
    this.toggleBookList();
    if (!book || (this.selectedBook && book && this.selectedBook._id === book._id)) {
      return;
    }
    console.log("Loading book ", book._id);
    this.loadChapters(book)
      .then(()=>this.selectedBook = book);
  }

  private loadChapters(book) {
    var self = this;
    return self.fetchChapters(book)
      .then(chapters => {
        book.chapters = chapters;
        self.selectedChapter = (chapters || [])[0];
        self.verses = (self.selectedChapter || {}).verses || [];
        return chapters;
      });
  }

  private fetchChapters(book) {
    var time = (new Date()).getTime();
    return this.httpClient.get(`api/v1/book/${book._id}/chapters?time=${time}`)
      .then(httpResponse => {
        const chapters = JSON.parse(httpResponse.response);
        console.log("Loaded", (chapters || []).length, "chapters");
        return chapters;
      });
  }

  public onBibleSelect(bible) {
    this.toggleBibleList();
    console.log("Selected bible ", bible._id);
    if (!bible || (this.selectedBible && bible && this.selectedBible._id === bible._id)) {
      return;
    }
    this.loadBooks(bible)
      .then(()=>this.selectedBible = bible);
  }

  private loadBooks(bible) {
    var self = this;
    return self.fetchBooks(bible)
      .then(books => {
        bible.books = books;
        self.selectedBook = (books || [])[0];
        self.selectedChapter = (self.selectedBook.chapters || [])[0] || {};
        self.verses = self.selectedChapter.verses || [];
      });
  }

  private fetchBooks(bible) {
    var self = this;
    var time = (new Date()).getTime();
    return self.httpClient.get(`api/v1/bible/${bible._id}/books?time=${time}`)
      .then(httpResponse => {
        const books = JSON.parse(httpResponse.response);
        console.log("Loaded", (books || []).length, "books");
        return books;
      });
  }

  private loadBibles() {
    var self = this;
    return self.fetchBibles()
      .then(bibles => {
        self.bibles = bibles;
        console.log(`Loaded ${bibles.length} bibles.`);
        if (bibles && bibles.length) {
          return self.loadBooks(bibles[0]);
        }
      });
  }

  private fetchBibles() {
    return this.httpClient.get('api/v1/bibles?time=' + (new Date()).getTime())
      .then(httpResponse => {
        return JSON.parse(httpResponse.response) || [];
      });
  }

  public created() {
    const self = this;
    return this.loadBibles();
  }

  public get overlayVisible(){
    return this.showBibleList || this.showBookList;
  }

  public toggleBibleList() {
    this.showBibleList = !this.showBibleList;
  }

  public toggleBookList() {
    this.showBookList = !this.showBookList;
  }

}