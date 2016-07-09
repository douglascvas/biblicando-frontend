import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";
import {KeyValue} from "../dropdownMenu/dropdownMenu";

export class BibleList {
  bibles;
}

@inject(HttpClient)
@customElement('bible-list')
export class BibleListController {
  @bindable bibles:any[];
  @bindable onselect:Function;
  filteredBibles:any[];
  menuItems:KeyValue[];
  @bindable filter:String;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
  }

  private filterBibles(bibles, filter) {
    var self = this;
    console.log('filter', filter);
    if (!filter) {
      self.filteredBibles = bibles;
      return;
    }
    self.filteredBibles = (bibles || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    return true;
  }

  public filterChanged(newValue, oldValue) {
    console.log('filter changed:', newValue);
    this.filterBibles(this.bibles, newValue || '');
  }

  public biblesChanged(){
    this.filterBibles(this.bibles, this.filter || '');
  }

  public created() {
  }

  private formatMenuItems():KeyValue[] {
    if (this.bibles) {
      return this.bibles.map(bible=>new KeyValue(bible._id, `${bible.languageCode} - ${bible.name}`));
    }
    return [];
  }

}