import {Factory} from "../../common/BasicFactory";
import {StudySectionMenu} from "./StudySectionMenu";
import {Container} from "../../common/Container";
import {OverlayFactory} from "../../menu/OverlayFactory";
import {Overlay} from "../../menu/Overlay";
import {BibleMenuFactory} from "../../bible/bibleMenu/BibleMenuFactory";
import {ChapterMenuFactory} from "../../chapter/chapterMenu/ChapterMenuFactory";
import {Bible} from "../../bible/Bible";
import {MenuFactory} from "../../common/MenuFactory";
import {Book} from "../../book/Book";
import {Chapter} from "../../chapter/Chapter";
import {BookMenuFactory} from "../../book/bookMenu/BookMenuFactory";
import {LoggerFactory, ConsoleLoggerFactory} from "../../common/LoggerFactory";

export class StudySectionMenuFactory implements Factory<StudySectionMenu> {
  constructor(private _container: Container) {
  }

  public create(): StudySectionMenu {
    return new StudySectionMenu(this.getOverlayFactory(),
      this.getBibleMenuFactory(),
      this.getBookMenuFactory(),
      this.getChapterMenuFactory(),
      this.getLoggerFactory()
    );
  }

  private getOverlayFactory(): Factory<Overlay> {
    return this._container.getValue(OverlayFactory, () => new OverlayFactory());
  }

  private getBibleMenuFactory(): MenuFactory<Bible> {
    return this._container.getValue(BibleMenuFactory, () => new BibleMenuFactory(this._container));
  }

  private getBookMenuFactory(): MenuFactory<Book> {
    return this._container.getValue(BookMenuFactory, () => new BookMenuFactory(this._container));
  }

  private getChapterMenuFactory(): MenuFactory<Chapter> {
    return this._container.getValue(ChapterMenuFactory, () => new ChapterMenuFactory(this._container));
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory());
  }
}
