import {StudySection} from "./StudySection";
import {Factory} from "../common/BasicFactory";
import {BibleStoreFactory} from "../bible/BibleStoreFactory";
import {Container} from "../common/Container";
import {BookServiceFactory} from "../book/BookServiceFactory";
import {ChapterServiceFactory} from "../chapter/ChapterServiceFactory";
import {VerseServiceFactory} from "../verse/VerseServiceFactory";
import {VerseListFactory} from "../verse/verseList/VerseListFactory";
import {SectionContextFactory} from "./SectionContextFactory";
import {StudySectionMenuFactory} from "./menu/StudySectionMenuFactory";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";

export class StudySectionFactory implements Factory<StudySection> {
  constructor(private _container: Container) {
  }

  public create(): StudySection {
    return new StudySection(this.getBibleStoreFactory().create(),
      this.getBookServiceFactory().create(),
      this.getChapterServiceFactory().create(),
      this.getVerseServiceFactory().create(),
      this.getVerseListFactory(),
      this.getSectionContextFactory(),
      this.getStudySectionMenuFactory(),
      this.getLoggerFactory()
    );
  }

  private getBibleStoreFactory(): BibleStoreFactory {
    return this._container.getValue(BibleStoreFactory, () => new BibleStoreFactory(this._container));
  }

  private getBookServiceFactory(): BookServiceFactory {
    return this._container.getValue(BookServiceFactory, () => new BookServiceFactory(this._container));
  }

  private getChapterServiceFactory(): ChapterServiceFactory {
    return this._container.getValue(ChapterServiceFactory, () => new ChapterServiceFactory(this._container));
  }

  private getVerseServiceFactory(): VerseServiceFactory {
    return this._container.getValue(VerseServiceFactory, () => new VerseServiceFactory(this._container));
  }

  private getVerseListFactory(): VerseListFactory {
    return this._container.getValue(VerseListFactory, () => new VerseListFactory(this._container));
  }

  private getSectionContextFactory(): SectionContextFactory {
    return this._container.getValue(SectionContextFactory, () => new SectionContextFactory(this._container));
  }

  private getStudySectionMenuFactory(): StudySectionMenuFactory {
    return this._container.getValue(StudySectionMenuFactory, () => new StudySectionMenuFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
