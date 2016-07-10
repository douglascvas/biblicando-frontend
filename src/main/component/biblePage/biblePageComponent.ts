import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {BibleMenu} from "../../model/menu/bibleMenu";
import {BibleService} from "../../service/bible/bibleService";
import {BookService} from "../../service/bible/bookService";
import {ChapterService} from "../../service/bible/chapterService";
import {BiblePage} from "../../model/page/biblePage";

@inject(HttpClient)
@customElement('bible-page')
export class BiblePageComponent {
  public biblePage:BiblePage;

  // @bindable version;
  // public showBibleList;
  // public showBookList;
  // public bibles:Array<any>;
  // @bindable selectedBible:any;
  // @bindable selectedBook:any;
  // @bindable selectedChapter:any;
  // public verses:any[];

  constructor(private bibleService:BibleService,
              private bookService:BookService,
              private chapterService:ChapterService) {
    this.biblePage = new BiblePage();
  }


  public created() {
    const self = this;
    return this.loadBibles();
  }

  public get overlayVisible() {
    return this.bibleMenu.visible || this.showBookList;
  }

  public toggleBibleList() {
    this.showBibleList = !this.showBibleList;
  }

  public toggleBookList() {
    this.showBookList = !this.showBookList;
  }

}