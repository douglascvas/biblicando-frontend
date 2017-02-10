export class InnerText {
  private value: string;

  constructor(private element: any) {
  }

  public valueChanged(newValue, oldValue) {
    this.element.innerText = this.value;
  }

  public bind() {
    this.element.innerText = this.value;
  }
}
