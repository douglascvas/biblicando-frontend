export class MenuItem<E> {
  constructor(public readonly label: string,
              public readonly data: E,
              private readonly onSelect: (menuItem: MenuItem<E>) => Promise<void>) {
  }

  public select(): Promise<void> {
    return this.onSelect(this);
  }
}
