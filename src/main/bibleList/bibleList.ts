import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";
import {KeyValue} from "../dropdownMenu/dropdownMenu";

@inject(HttpClient)
@customElement('bible-list')
export class BibleList {
  public bibles:Array<any>;
  private serverBibles:Array<any>;
  @bindable selectable:Selectable;
  @bindable menuItems:Array<KeyValue>;
  filter:String;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
    this.selectBible = this.selectBible.bind(this);
  }

  private filterBibles($event) {
    var self = this;
    self.bibles = (self.serverBibles || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0);
    return true;
  }

  public filterChanged(newValue, oldValue) {
    console.log('filter changed:', newValue);
    this.filterBibles(newValue || '');
  }

  public created() {
    const self = this;
    // self.httpClient.get('api/v1/bibles')
    //   .then(httpResponse => {
    //     self.serverBibles = JSON.parse(httpResponse.response);
    //     self.bibles = self.serverBibles;
    //     self.menuItems = self.formatMenuItems();
    //   });
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