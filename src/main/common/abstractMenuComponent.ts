import {Menu} from "./menu";

export abstract class AbstractMenuComponent<E> {
  public filterElement:any;

  protected abstract getMenu():Menu<E>;

  public attached() {
    this.filterElement.focus();
  }

  /**
   * Select the first item in the menu if ENTER key is pressed.
   */
  public processFilterKeyPress(event) {
    if (!event || event.keyCode !== 13) {
      return true;
    }
    var items = this.getMenu().filteredItems || [];
    var selectedItem = items[0];
    if (selectedItem) {
      this.selectItem(selectedItem);
    }
  }

  public selectItem(item):void {
    this.getMenu().selectItem(item);
  }

}