import {Verse} from "../../verse";

export class VerseList {
  verses: Array<any>;

  constructor() {
  }

  public formatVerseNumber(verse: Verse): string {
    if (!verse) {
      return ""
    }
    if (verse.numbers.length > 1) {
      verse.numbers.sort();
      return verse.numbers[0] + '-' + verse.numbers[verse.numbers.length - 1];
    }
    return verse.numbers[0].toString();
  }

}
