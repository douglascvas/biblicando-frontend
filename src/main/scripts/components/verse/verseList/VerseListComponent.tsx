import * as React from "react";
import {VerseList} from "./VerseList";
import {Verse} from "../Verse";

export interface VerseListState {
}

export interface VerseListProperties {
  id: string,
  className?: string,
  verseList: VerseList
}

export default class VerseListComponent extends React.Component<VerseListProperties,VerseListState> {
  constructor(props: VerseListProperties, context: any) {
    super(props, context);
  }

  private formatVerseNumber(verse: Verse): string {
    if (!verse) {
      return ""
    }
    if (verse.numbers.length > 1) {
      verse.numbers.sort();
      return verse.numbers[0] + '-' + verse.numbers[verse.numbers.length - 1];
    }
    return verse.numbers[0].toString();
  }

  public render() {
    const verses = this.props.verseList.getVerses().map((verse: Verse) => (
      <span className="verse-list__verse" key={verse._id}>
            <span className="verse-list__verse-number">
              {this.formatVerseNumber(verse)}
            </span>
            <span>{verse.text}</span>
        </span>
    ));
    return (
      <bc-verse-list id={this.props.id} class={this.props.className}>
        {verses}
      </bc-verse-list>
    )
  }

}
