import {Bible} from "../Bible";
import * as React from "react";
import {ItemList} from "../../common/ItemList";

export interface BibleListProperties {
  onSelect: (Bible) => void,
  className: string,
  list: ItemList<Bible>,
  id: string
}

export default class BibleListComponent extends React.Component<BibleListProperties,ItemList<Bible>> {
  private _unregisterChangeListener: Function;

  constructor(props: BibleListProperties, context: any) {
    super(props, context);
    this.state = props.list;
  }

  private selectBible(bible) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(bible);
    }
  }

  public componentWillMount() {
    this._unregisterChangeListener = this.props.list.onChange(() => this.setState(this.props.list));
  }

  public componentWillUnmount() {
    this._unregisterChangeListener();
  }

  public render() {
    const bibleItems = this.props.list.getItems().map((bible: Bible, index: number) => (
      <a href="javascript:void(0)" key={`bible_${index}`} class="collection-item" onClick={()=>this.selectBible(bible)}>
        <span>{`${bible.languageCode} - ${bible.name}`}</span>
      </a>));

    return (
      <div className={this.props.className}>
        {bibleItems}
      </div>
    )
  }

}
