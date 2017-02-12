import {Book} from "../Book";
import * as React from "react";
import {MenuFilter} from "../../menu/MenuFilter";
import SearchComponent from "../../search/SearchComponent";
import BookMenuBodyComponent from "./menuBody/BookMenuBodyComponent";
import {BookMenu} from "./BookMenu";

export interface BookMenuState {
  filter: MenuFilter<Book>
}

export interface BookMenuProperties {
  id: string,
  className: string,
  menu: BookMenu
}

export default class BookMenuComponent extends React.Component<BookMenuProperties,BookMenuState> {
  constructor(props: BookMenuProperties, context: any) {
    super(props, context);

    props.menu.onToggle(() => this.setState({}));
  }

  public render() {
    return (
      <div className={this.props.className}>
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
      </div>
    )
  }

}
