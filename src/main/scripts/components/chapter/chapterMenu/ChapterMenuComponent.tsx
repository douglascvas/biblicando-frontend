import * as React from "react";
import SearchComponent from "../../search/SearchComponent";
import ChapterMenuBodyComponent from "./menuBody/ChapterMenuBodyComponent";
import {ChapterMenu} from "./ChapterMenu";

export interface ChapterMenuState {
}

export interface ChapterMenuProperties {
  id: string,
  className: string,
  menu: ChapterMenu
}

export default class ChapterMenuComponent extends React.Component<ChapterMenuProperties,ChapterMenuState> {
  private _unregisterFunctions: Function[];

  constructor(props: ChapterMenuProperties, context: any) {
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
      <div className={this.props.className}>
        <div className="row menu__body-wrapper">
          <div className="col s12 left chapter-menu__body">
            <SearchComponent id={`${this.props.id}:chapter-menu-search`} search={this.props.menu.search} className="chapter-menu__search input-field">
              Chapter Number
            </SearchComponent>
            <ChapterMenuBodyComponent id={`${this.props.id}:chapter-menu-body`}
                                      menuBody={this.props.menu.menuBody}
                                      className="col s12 left"/>
          </div>
        </div>
      </div>
    )
  }

}
