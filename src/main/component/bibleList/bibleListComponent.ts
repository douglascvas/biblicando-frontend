import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {KeyValue} from "../../global/keyValue";
import {BibleMenu} from "../../model/menu/bibleMenu";

@inject(HttpClient)
@customElement('bible-list')
export class BibleListController {
  @bindable menu:BibleMenu;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
  }

  public selectItem(item) {
  }

  private formatMenuItems():KeyValue[] {
    if (this.menu) {
      return this.menu.filteredItems.map(bible=>new KeyValue(bible._id, `${bible.languageCode} - ${bible.name}`));
    }
    return [];
  }

}