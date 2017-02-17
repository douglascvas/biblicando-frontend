import {Verse} from "../Verse";
import {SectionContext} from "../../studySection/SectionContext";

export class VerseList {
  constructor(private _sectionContext: SectionContext) {
  }

  public getVerses(): Verse[] {
    return this._sectionContext.verses || [];
  }

}
