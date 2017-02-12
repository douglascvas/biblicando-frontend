import {Bible} from "../Bible";
import * as React from "react";
import {MenuFilter} from "../../menu/MenuFilter";
import SearchComponent from "../../search/SearchComponent";
import BibleMenuBodyComponent from "./menuBody/BibleMenuBodyComponent";
import {BibleMenu} from "./BibleMenu";

export interface BibleMenuState {
  filter: MenuFilter<Bible>
}

export interface BibleMenuProperties {
  id: string,
  className: string,
  menu: BibleMenu
}

export default class BibleMenuComponent extends React.Component<BibleMenuProperties,BibleMenuState> {
  constructor(props: BibleMenuProperties, context: any) {
    super(props, context);

    props.menu.onToggle(() => this.setState({}));
  }

  public render() {
    return (
      <div className={this.props.className}>
        <div className="row menu__body-wrapper">
          <div className="col s12 left bible-menu__body">
            <SearchComponent id={`${this.props.id}:bible-menu-search`} search={this.props.menu.search} className="bible-menu__search input-field">
              Version Name
            </SearchComponent>
            <BibleMenuBodyComponent id={`${this.props.id}:bible-menu-body`}
                                    menuBody={this.props.menu.menuBody}
                                    className="collection bible-menu__list"/>
          </div>
        </div>
      </div>
    )
  }

}
