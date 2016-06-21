import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";
import {KeyValue} from "../dropdownMenu/dropdownMenu";

@inject(HttpClient)
@customElement('bible-list')
export class BibleList {
  @bindable selectable:Selectable;
  @bindable bibles:Array<any>;
  @bindable menuItems:Array<KeyValue>;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
    this.selectBible = this.selectBible.bind(this);
  }

  public created() {
    const self = this;
    self.httpClient.get('api/v1/bibles')
      .then(httpResponse => {
        self.bibles = JSON.parse(httpResponse.response);
        self.menuItems = self.formatMenuItems();
      });
  }

  public selectBible(bibleId) {
    this.selectable.selectedValue = bibleId;
  }

  private formatMenuItems():KeyValue[] {
    if (this.bibles) {
      return this.bibles.map(bible=>new KeyValue(bible._id, `${bible.languageCode} - ${bible.name}`));
    }
    return [];
  }

}