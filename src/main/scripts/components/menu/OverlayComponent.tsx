import * as React from "react";
import {EventHandler, MouseEvent} from "react";
import {Overlay} from "./Overlay";

export interface OverlayProperties {
  id: string,
  overlay: Overlay,
  onClick?: EventHandler<MouseEvent<any>>,
  className?: string
}

export interface OverlayState {
}

export default class OverlayComponent extends React.Component<OverlayProperties, OverlayState> {
  constructor(props: OverlayProperties, context: any) {
    super(props, context);
  }

  private overlayClick(event) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event);
    }
  }

  public render() {
    const className = `overlay ${this.props.overlay.visible ? this.props.className : 'hide'}`;
    return (<div className={className} onClick={this.overlayClick.bind(this)}></div>)
  }
}
