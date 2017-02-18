import {Factory} from "../../common/BasicFactory";
import {VerseList} from "./VerseList";
import {Container} from "../../common/Container";
import {SectionContextFactory} from "../../studySection/SectionContextFactory";

export class VerseListFactory implements Factory<VerseList> {

  constructor(private _container: Container) {
  }

  create(): VerseList {
    return new VerseList(this.getSectionContextFactory().create());
  }

  private getSectionContextFactory(): SectionContextFactory {
    return this._container.getValue(SectionContextFactory, () => new SectionContextFactory(this._container));
  }

}
