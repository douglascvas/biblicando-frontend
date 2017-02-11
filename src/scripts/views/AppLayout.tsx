import * as React from "react";
import NavbarComponent from "../components/navbar/NavbarComponent";

export default class AppLayout extends React.Component<any, any> {
  public render() {
    return (
      <div id="layout">
        <NavbarComponent/>
        <div className="page-host full-height">
          {this.props.children}
        </div>
      </div>
    );
  }
}

