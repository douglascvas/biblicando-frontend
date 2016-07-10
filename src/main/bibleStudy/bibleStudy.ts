import {BiblePage} from "../model/page/biblePage";

export class BibleStudy {
  pages:BiblePage[];

  constructor() {
    this._initialize();
  }

  private _initialize() {
    this.pages = [new BiblePage()];
  }
}