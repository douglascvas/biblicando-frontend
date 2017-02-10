import {Bible} from "../Bible";
import * as React from "react";
import {Filter} from "../../common/filter/Filter";
import SearchComponent from "../../search/SearchComponent";
import BibleListComponent from "../bibleList/BibleListComponent";
import {BibleMenu} from "./BibleMenu";

export interface BibleMenuState {
  filter: Filter<Bible>
}

export interface BibleMenuProperties {
  id: string,
  className: string,
  menu: BibleMenu
}

export default class BibleMenuComponent extends React.Component<BibleMenuProperties,BibleMenuState> {
  constructor(props: BibleMenuProperties, context: any) {
    super(props, context);

    this.selectItem = this.selectItem.bind(this);
  }

  private selectItem(item: Bible): void {
    this.props.menu.selectItem(item);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <div class="row menu__body-wrapper">
          <div class="col s12 left bible-menu__body">
            <SearchComponent id={`${this.props.id}_bible_menu_search`} search={this.props.menu.search} className="bible-menu__search input-field">
              Version Name
            </SearchComponent>
            <BibleListComponent id={`bible_menu_list_${this.props.id}`}
                                list={this.props.menu.itemList}
                                onSelect={this.selectItem}
                                className="collection bible-menu__list"/>
          </div>
        </div>
      </div>
    )
  }

}
