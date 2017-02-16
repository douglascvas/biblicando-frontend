import {SectionContext} from "../../../../scripts/components/studySection/SectionContext";
import {Bible} from "../../../../scripts/components/bible/Bible";
import {assert} from "chai";
import * as sinon from "sinon";
import {Book} from "../../../../scripts/components/book/Book";
import {Chapter} from "../../../../scripts/components/chapter/Chapter";
import {ServiceContainer} from "../../../../scripts/components/common/ServiceContainer";
import {LoggerFactory} from "../../../../scripts/components/common/loggerFactory";

describe('SectionContext', () => {
  let sectionContext: SectionContext;

  beforeEach(() => {
    let serviceContainer = <any>sinon.createStubInstance(ServiceContainer);
    let loggerFactory = new LoggerFactory();
    serviceContainer.getLoggerFactory.returns(loggerFactory);
    sectionContext = new SectionContext(serviceContainer);
  });

  describe('Bibles', () => {
    it('should save the bibles', async() => {
      // given
      const bibles: Bible[] = [buildBible("1"), buildBible("2")];

      // when
      await
      sectionContext.setBibles(bibles);

      // then
      assert.equal(sectionContext.bibles, bibles);
    });

    it('should notify listener when bibles are updated', async() => {
      // given
      const bibles: Bible[] = [buildBible("1"), buildBible("2")];
      const listener: any = sinon.mock();
      sectionContext.onBiblesChange(listener);

      // when
      await sectionContext.setBibles(bibles);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Current bible', () => {
    it('should update the current bible', async() => {
      // given
      const bible: Bible = buildBible();

      // when
      await
      sectionContext.setCurrentBible(bible);

      // then
      assert.equal(sectionContext.currentBible, bible);
    });

    it('should notify listener when current bible is updated', async() => {
      // given
      const bible: Bible = buildBible();
      const listener: any = sinon.mock();
      sectionContext.onCurrentBibleChange(listener);

      // when
      await sectionContext.setCurrentBible(bible);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Books', () => {
    it('should save the books', async() => {
      // given
      const books: Book[] = [buildBook("1"), buildBook("2")];

      // when
      await sectionContext.setBooks(books);

      // then
      assert.equal(sectionContext.books, books);
    });

    it('should notify listener when books are updated', async() => {
      // given
      const books: Book[] = [buildBook("1"), buildBook("2")];
      const listener: any = sinon.mock();
      sectionContext.onBooksChange(listener);

      // when
      await sectionContext.setBooks(books);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Current book', () => {
    it('should update the current book', async() => {
      // given
      const book: Book = buildBook();

      // when
      await sectionContext.setCurrentBook(book);

      // then
      assert.equal(sectionContext.currentBook, book);
    });

    it('should notify listener when current book is updated', async() => {
      // given
      const book: Book = buildBook();
      const listener: any = sinon.mock();
      sectionContext.onCurrentBookChange(listener);

      // when
      await sectionContext.setCurrentBook(book);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Chapters', () => {
    it('should save the chapters', async() => {
      // given
      const chapters: Chapter[] = [buildChapter("1"), buildChapter("2")];

      // when
      await sectionContext.setChapters(chapters);

      // then
      assert.equal(sectionContext.chapters, chapters);
    });

    it('should notify listener when chapters are updated', async() => {
      // given
      const chapters: Chapter[] = [buildChapter("1"), buildChapter("2")];
      const listener: any = sinon.mock();
      sectionContext.onChaptersChange(listener);

      // when
      await
      sectionContext.setChapters(chapters);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Current chapter', () => {
    it('should update the current chapter', async() => {
      // given
      const chapter: Chapter = buildChapter();

      // when
      await sectionContext.setCurrentChapter(chapter);

      // then
      assert.equal(sectionContext.currentChapter, chapter);
    });

    it('should notify listener when current chapter is updated', async () => {
      // given
      const chapter: Chapter = buildChapter();
      const listener: any = sinon.mock();
      sectionContext.onCurrentChapterChange(listener);

      // when
      await sectionContext.setCurrentChapter(chapter);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });


  function buildBible(prefix?: string) {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

  function buildBook(prefix?: string) {
    prefix = prefix || "1";
    const book: Book = new Book();
    book.name = `${prefix}_test_book`;
    book._id = `${prefix}_test_book_id`;
    return book;
  }

  function buildChapter(prefix?: string) {
    prefix = prefix || "1";
    const chapter: Chapter = new Chapter();
    chapter._id = `${prefix}_test_chapter_id`;
    return chapter;
  }
});
