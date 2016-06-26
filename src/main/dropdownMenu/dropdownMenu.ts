import {bindable, customElement} from "aurelia-templating";

export class KeyValue {
  constructor(public key, public value) {
  }
}

@customElement('dropdown-menu')
export class DropdownMenu {
  @bindable items:KeyValue[];
  @bindable title:string;
  @bindable onSelect:Function;

  private wrapper:any;

  constructor() {
  }

  public itemsChanged(newValue) {
  }

  private toggleClass(element, className) {
    const regex = new RegExp('(?:^| )(' + className + ')(?:$| )');
    var classAttribute = element.className || '';
    if (classAttribute.match(regex)) {
      classAttribute = classAttribute.replace(regex, ' ');
    } else {
      classAttribute = classAttribute + ' ' + className;
    }
    element.className = classAttribute.replace(/[ ]+/g, ' ');
  }

  public clickMenu(event) {
    this.wrapper = event.target;
    this.toggleClass(this.wrapper, 'active');
  }

  public clickMenuItem(event:any, item:KeyValue) {
    this.title = item.value;

    // Callback passed in to the component
    if (typeof this.onSelect === 'function') {
      this.onSelect(item.key);
    }

    if (this.wrapper) {
      this.toggleClass(this.wrapper, 'active');
    }
    console.log('clicked wrapper', item.value, this.wrapper);
  }
}