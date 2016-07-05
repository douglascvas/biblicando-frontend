import {bindable, customElement} from "aurelia-templating";
import {inject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-http-client";
import {Selectable} from "../selectable";
import {KeyValue} from "../dropdownMenu/dropdownMenu";

@inject(HttpClient)
@customElement('bible-list')
export class BibleList {
  @bindable bibles:any[];
  @bindable onselect:Function;
  filteredBibles:any[];
  menuItems:KeyValue[];
  filter:String;

  constructor(private httpClient:HttpClient) {
    console.log("Bibles list started.");
  }

  private filterBibles(bibles) {
    var self = this;
    self.filteredBibles = (bibles || [])
      .filter(bible=>bible.name.toLowerCase().indexOf(self.filter.toLowerCase()) >= 0);
    return true;
  }

  public filterChanged(newValue, oldValue) {
    console.log('filter changed:', newValue);
    this.filterBibles(newValue || '');
  }

  public created() {
    console.log("Bibles:", this.bibles);
    this.filterBibles(this.bibles);
  }

  private formatMenuItems():KeyValue[] {
    if (this.bibles) {
      return this.bibles.map(bible=>new KeyValue(bible._id, `${bible.languageCode} - ${bible.name}`));
    }
    return [];
  }

}