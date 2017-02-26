import * as React from "react";
import SearchComponent from "../../search/SearchComponent";
import BookMenuBodyComponent from "./menuBody/BookMenuBodyComponent";
import {BookMenu} from "./BookMenu";

export interface BookMenuState {
}

export interface BookMenuProperties {
  id: string,
  className: string,
  menu: BookMenu
}

export default class BookMenuComponent extends React.Component<BookMenuProperties,BookMenuState> {
  private _unregisterFunctions: Function[];

  constructor(props: BookMenuProperties, context: any) {
    super(props, context);

    this._unregisterFunctions = [];
  }

  public componentWillMount() {
    const onToggleUnregister = this.props.menu.onToggle(() => this.setState({}));
    this._unregisterFunctions.push(onToggleUnregister);
  }

  public componentWillUnmount() {
    this._unregisterFunctions.forEach(fn => fn());
  }

  public render() {
    return (
      <bc-book-menu class={this.props.className}>
        <div className="row menu__body-wrapper">
          <div className="col s12 left book-menu__body">
            <SearchComponent id={`${this.props.id}:book-menu-search`} search={this.props.menu.search} className="book-menu__search input-field">
              Book Name
            </SearchComponent>
            <BookMenuBodyComponent id={`${this.props.id}:book-menu-body`}
                                   menuBody={this.props.menu.menuBody}
                                   className="collection book-menu__list"/>
          </div>
        </div>
      </bc-book-menu>
    )
  }

}
