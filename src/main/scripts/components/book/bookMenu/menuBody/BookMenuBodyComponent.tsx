import {Book} from "../../Book";
import * as React from "react";
import {MenuBody} from "../../../menu/MenuBody";
import {MenuItem} from "../../../menu/MenuItem";

export interface BookMenuBodyProperties {
  className: string,
  menuBody: MenuBody<Book>,
  id: string
}

export default class BookMenuBodyComponent extends React.Component<BookMenuBodyProperties,MenuBody<Book>> {
  private _unregisterChangeListener: Function;

  constructor(props: BookMenuBodyProperties, context: any) {
    super(props, context);
    this.state = props.menuBody;
  }

  public componentWillMount() {
    this._unregisterChangeListener = this.props.menuBody.onChange(() => this.setState(this.props.menuBody));
  }

  public componentWillUnmount() {
    this._unregisterChangeListener();
  }

  public render() {
    const bookItems = this.props.menuBody.getItems().map((item: MenuItem<Book>, index: number) => (
      <a href="javascript:void(0)" key={`book_${index}`} className="collection-item" onClick={()=>item.select()}>
        <span>{item.label}</span>
      </a>));

    return (
      <bc-book-menu-body class={this.props.className}>
        {bookItems}
      </bc-book-menu-body>
    )
  }

}
