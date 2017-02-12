import * as React from "react";
import {Search} from "./Search";
import ChangeEvent = React.ChangeEvent;
import Component = React.Component;

export interface SearchProperties {
  id: string,
  search: Search,
  className: string
}

export interface SearchState {
  query: string;
}

export default class SearchComponent extends Component<SearchProperties,SearchState> {

  constructor(props: SearchProperties, context: any) {
    super(props, context);
    this.state = {} as SearchState;

    this.processKeyDown = this.processKeyDown.bind(this);
    this.processChange = this.processChange.bind(this);
  }

  private processKeyDown(event: any) {
    this.props.search.triggerKeyDown(event);
  }

  private processChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.search.triggerQueryChange(event.target.value);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <i className="fa fa-search material-icons prefix" aria-hidden="true"></i>
        <input id={`search:${this.props.id}`}
               value={this.props.search.query}
               type="text"
               className="validate"
               onKeyDown={this.processKeyDown}
               onChange={this.processChange}/>
        <label htmlFor={`search:${this.props.id}`} className="active">{this.props.children}</label>
      </div>
    );
  }
}
