import {SectionContext} from "../../../../main/scripts/components/studySection/SectionContext";
import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as sinon from "sinon";
import {Book} from "../../../../main/scripts/components/book/Book";
import {Chapter} from "../../../../main/scripts/components/chapter/Chapter";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {Verse} from "../../../../main/scripts/components/verse/Verse";

describe('SectionContext', () => {
  let sectionContext: SectionContext;

  beforeEach(() => {
    let loggerFactory = new TestLoggerFactory();
    sectionContext = new SectionContext(loggerFactory);
  });

  describe('setBibles', () => {
    it('should save the bibles', async() => {
      // given
      const bibles: Bible[] = [aBible("1"), aBible("2")];

      // when
      await
        sectionContext.setBibles(bibles);

      // then
      assert.equal(sectionContext.bibles, bibles);
    });

    it('should notify listener when bibles are updated', async() => {
      // given
      const bibles: Bible[] = [aBible("1"), aBible("2")];
      const listener: any = sinon.mock();
      sectionContext.onBiblesChange(listener);

      // when
      await sectionContext.setBibles(bibles);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('setCurrentBible', () => {
    it('should update the current bible', async() => {
      // given
      const bible: Bible = aBible();

      // when
      await
        sectionContext.setCurrentBible(bible);

      // then
      assert.equal(sectionContext.currentBible, bible);
    });

    it('should notify listener when current bible is updated', async() => {
      // given
      const bible: Bible = aBible();
      const listener: any = sinon.mock();
      sectionContext.onCurrentBibleChange(listener);

      // when
      await sectionContext.setCurrentBible(bible);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('setBooks', () => {
    it('should save the books', async() => {
      // given
      const books: Book[] = [aBook("1"), aBook("2")];

      // when
      await sectionContext.setBooks(books);

      // then
      assert.equal(sectionContext.books, books);
    });

    it('should notify listener when books are updated', async() => {
      // given
      const books: Book[] = [aBook("1"), aBook("2")];
      const listener: any = sinon.mock();
      sectionContext.onBooksChange(listener);

      // when
      await sectionContext.setBooks(books);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('setCurrentBook', () => {
    it('should update the current book', async() => {
      // given
      const book: Book = aBook();

      // when
      await sectionContext.setCurrentBook(book);

      // then
      assert.equal(sectionContext.currentBook, book);
    });

    it('should notify listener when current book is updated', async() => {
      // given
      const book: Book = aBook();
      const listener: any = sinon.mock();
      sectionContext.onCurrentBookChange(listener);

      // when
      await sectionContext.setCurrentBook(book);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('setChapters', () => {
    it('should save the chapters', async() => {
      // given
      const chapters: Chapter[] = [aChapter("1"), aChapter("2")];

      // when
      await sectionContext.setChapters(chapters);

      // then
      assert.equal(sectionContext.chapters, chapters);
    });

    it('should notify listener when chapters are updated', async() => {
      // given
      const chapters: Chapter[] = [aChapter("1"), aChapter("2")];
      const listener: any = sinon.mock();
      sectionContext.onChaptersChange(listener);

      // when
      await
        sectionContext.setChapters(chapters);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('setCurrentChapter', () => {
    it('should update the current chapter', async() => {
      // given
      const chapter: Chapter = aChapter();

      // when
      await sectionContext.setCurrentChapter(chapter);

      // then
      assert.equal(sectionContext.currentChapter, chapter);
    });

    it('should notify listener when current chapter is updated', async() => {
      // given
      const chapter: Chapter = aChapter();
      const listener: any = sinon.mock();
      sectionContext.onCurrentChapterChange(listener);

      // when
      await sectionContext.setCurrentChapter(chapter);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  describe('Verses', () => {
    it('should save the verses', async() => {
      // given
      const verses: Verse[] = [aVerse("1"), aVerse("2")];

      // when
      await sectionContext.setVerses(verses);

      // then
      assert.equal(sectionContext.verses, verses);
    });

    it('should notify listener when verses are updated', async() => {
      // given
      const verses: Verse[] = [aVerse("1"), aVerse("2")];
      const listener: any = sinon.mock();
      sectionContext.onVersesChange(listener);

      // when
      await
        sectionContext.setVerses(verses);

      // then
      assert.isTrue(listener.calledOnce);
    });
  });

  function aBible(prefix?: string): Bible {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

  function aBook(prefix?: string): Book {
    prefix = prefix || "1";
    const book: Book = new Book();
    book.name = `${prefix}_test_book`;
    book._id = `${prefix}_test_book_id`;
    return book;
  }

  function aChapter(prefix?: string): Chapter {
    prefix = prefix || "1";
    const chapter: Chapter = new Chapter();
    chapter._id = `${prefix}_test_chapter_id`;
    return chapter;
  }

  function aVerse(prefix?: string): Verse {
    prefix = prefix || "1";
    const verse: Verse = new Verse();
    verse._id = `${prefix}_test_verse_id`;
    return verse;
  }
});
