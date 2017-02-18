import {MenuItem} from "./MenuItem";

export abstract class MenuItemFactory {
  abstract create<E>(label: string, data: E, onSelect: (menuItem: MenuItem<E>) => Promise<void>): MenuItem<E>;
}

export class MenuItemFactoryDefault implements MenuItemFactory {
  public create<E>(label: string, data: E, onSelect: (menuItem: MenuItem<E>) => Promise<void>): MenuItem<E> {
    return new MenuItem(label, data, onSelect);
  }
}
