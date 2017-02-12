export class MenuItem<E> {
  constructor(public readonly label: string,
              public readonly data: E,
              private readonly onSelect: (menuItem: MenuItem<E>) => void) {
  }

  public select() {
    this.onSelect(this);
  }
}
