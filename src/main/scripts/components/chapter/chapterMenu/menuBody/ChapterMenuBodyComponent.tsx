import * as React from "react";
import {MenuBody} from "../../../menu/MenuBody";
import {MenuItem} from "../../../menu/MenuItem";
import {Chapter} from "../../Chapter";

export interface ChapterMenuBodyProperties {
  className: string,
  menuBody: MenuBody<Chapter>,
  id: string
}

export default class ChapterMenuBodyComponent extends React.Component<ChapterMenuBodyProperties,MenuBody<Chapter>> {
  private _unregisterChangeListener: Function;

  constructor(props: ChapterMenuBodyProperties, context: any) {
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
    const chapterItems = this.props.menuBody.getItems().map((item: MenuItem<Chapter>, index: number) => (
      <a href="javascript:void(0)" key={`chapter_${index}`} className="col s1 menu__item" onClick={()=>item.select()}>
        <span>{item.label}</span>
      </a>));

    return (
      <bc-chapter-menu-body class={this.props.className}>
        <div className="row">
        {chapterItems}
        </div>
      </bc-chapter-menu-body>
    )
  }

}
