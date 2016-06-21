import {bindable} from "aurelia-templating";
import {customElement} from "aurelia-templating";
import {HttpClient} from "aurelia-http-client";

export class KeyValue {
  constructor(public key, public value) {
  }
}

@customElement('dropdown-menu')
export class DropdownMenu {
  @bindable items:KeyValue[];
  @bindable title:string;
  @bindable onSelect:Function;

  constructor() {
  }

  public itemsChanged(newValue) {
    console.log('Items: ', newValue);
  }

  private toggleClass(classAttribute, className):string {
    const regex = new RegExp('(?:^| )(' + className + ')(?:$| )');
    classAttribute = classAttribute || '';
    if (classAttribute.match(regex)) {
      classAttribute = classAttribute.replace(regex, ' ');
    } else {
      classAttribute = classAttribute + ' ' + className;
    }
    return classAttribute.replace(/[ ]+/g, ' ');
  }

  public clickMenu(event) {
    event.target.className = this.toggleClass(event.target.className, 'active');
  }

  public clickMenuItem(event:any, item:KeyValue) {
    console.log("Selected item", item.key, item.value);
    this.title = item.value;
    if (typeof this.onSelect === 'function') {
      this.onSelect(item.key);
    }
    console.log('clicked item', event.target);
  }
}