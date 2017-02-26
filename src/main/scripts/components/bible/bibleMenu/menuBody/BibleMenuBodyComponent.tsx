import {Bible} from "../../Bible";
import * as React from "react";
import {MenuBody} from "../../../menu/MenuBody";
import {MenuItem} from "../../../menu/MenuItem";

export interface BibleMenuBodyProperties {
  className: string,
  menuBody: MenuBody<Bible>,
  id: string
}

export default class BibleMenuBodyComponent extends React.Component<BibleMenuBodyProperties,MenuBody<Bible>> {
  private _unregisterChangeListener: Function;

  constructor(props: BibleMenuBodyProperties, context: any) {
    super(props, context);
    this.state = props.menuBody;
  }

  public componentWillMount() {
    this._unregisterChangeListener = this.props.menuBody.onChange(() => this.setState(this.props.menuBody));
  }

  public componentWillUnmount() {
    this._unregisterChangeListener();
  }

  public render() {
    const bibleItems = this.props.menuBody.getItems().map((item: MenuItem<Bible>, index: number) => (
      <a href="javascript:void(0)" key={`bible_${index}`} className="collection-item" onClick={()=>item.select()}>
        <span>{item.label}</span>
      </a>));

    return (
      <bc-bible-menu-body class={this.props.className}>
        {bibleItems}
      </bc-bible-menu-body>
    )
  }

}
