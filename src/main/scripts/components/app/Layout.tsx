import * as React from "react";
import NavbarComponent from "../navbar/NavbarComponent";

export default class Layout extends React.Component<any,any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="layout">
        <NavbarComponent/>
        <div className="page-host full-height">
          {this.props.children}
        </div>
      </div>
    )
  }
}

