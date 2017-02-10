import * as React from "react";
import {Search} from "./Search";

export interface SearchProperties {
  id: string,
  search: Search,
  className: string
}

export default class SearchComponent extends React.Component<SearchProperties,Search> {

  constructor(props: SearchProperties, context: any) {
    super(props, context);
    this.state = props.search;

    this.processKeypress = this.processKeypress.bind(this);
  }

  private processKeypress(event) {
    this.state.triggerQueryChange(this.state.query);
    this.state.triggerKeyPress(event);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <i class="fa fa-search material-icons prefix" aria-hidden="true"></i>
        <input id={`search:${this.props.id}`} value={this.state.query} type="text" class="validate" onKeypress={this.processKeypress}/>
        <label htmlFor={`search:${this.props.id}`} class="active">{this.props.children}</label>
      </div>
    );
  }
}
