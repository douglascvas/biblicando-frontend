export abstract class Filter<E> {
  constructor(public query: string) {
  }

  public abstract filter(items: E[]): E[]
}
