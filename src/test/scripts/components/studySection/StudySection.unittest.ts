import {StudySection} from "../../../../main/scripts/components/studySection/StudySection";
import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as Sinon from "sinon";
import {Book} from "../../../../main/scripts/components/book/Book";
import {Chapter} from "../../../../main/scripts/components/chapter/Chapter";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {Verse} from "../../../../main/scripts/components/verse/Verse";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {StudySectionMenu} from "../../../../main/scripts/components/studySection/menu/StudySectionMenu";
import {Factory} from "../../../../main/scripts/components/common/BasicFactory";
import {SectionContext} from "../../../../main/scripts/components/studySection/SectionContext";
import {VerseList} from "../../../../main/scripts/components/verse/verseList/VerseList";
import {VerseService} from "../../../../main/scripts/components/verse/VerseService";
import {ChapterService} from "../../../../main/scripts/components/chapter/ChapterService";
import {BookService} from "../../../../main/scripts/components/book/BookService";
import {BibleStore} from "../../../../main/scripts/components/bible/BibleStore";
import {VerseListFactory} from "../../../../main/scripts/components/verse/verseList/VerseListFactory";
import {SectionContextFactory} from "../../../../main/scripts/components/studySection/SectionContextFactory";
import {StudySectionMenuFactory} from "../../../../main/scripts/components/studySection/menu/StudySectionMenuFactory";

describe('StudySection', () => {
  let studySection: StudySection,
    bibleStore: BibleStore,
    bookService: BookService,
    chapterService: ChapterService,
    verseService: VerseService,
    verseListFactory: Factory<VerseList>,
    sectionContextFactory: Factory<SectionContext>,
    studySectionMenuFactory: Factory<StudySectionMenu>,
    loggerFactory: LoggerFactory,
    sectionContext: SectionContext,
    studySectionMenu: StudySectionMenu,
    verseList: VerseList,

    onBiblesChangeUnregister: Function,
    onCurrentBibleChangeUnregister: Function,
    onCurrentBookChangeUnregister: Function,
    onCurrentChapterChangeUnregister: Function;

  beforeEach(() => {
    onBiblesChangeUnregister = Sinon.stub();
    onCurrentBibleChangeUnregister = Sinon.stub();
    onCurrentBookChangeUnregister = Sinon.stub();
    onCurrentChapterChangeUnregister = Sinon.stub();
    verseList = Sinon.createStubInstance(VerseList);
    studySectionMenu = Sinon.createStubInstance(StudySectionMenu);
    sectionContext = Sinon.createStubInstance(SectionContext);
    bibleStore = Sinon.createStubInstance(BibleStore);
    bookService = Sinon.createStubInstance(BookService);
    chapterService = Sinon.createStubInstance(ChapterService);
    verseService = Sinon.createStubInstance(VerseService);
    verseListFactory = Sinon.createStubInstance(VerseListFactory);
    sectionContextFactory = Sinon.createStubInstance(SectionContextFactory);
    studySectionMenuFactory = Sinon.createStubInstance(StudySectionMenuFactory);
    loggerFactory = new TestLoggerFactory();

    (<Sinon.SinonStub>sectionContextFactory.create).returns(sectionContext);
    (<Sinon.SinonStub>studySectionMenuFactory.create).returns(studySectionMenu);
    (<Sinon.SinonStub>verseListFactory.create).returns(verseList);

    (<Sinon.SinonStub>bibleStore.onChange).returns(onBiblesChangeUnregister);
    (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).returns(onCurrentBibleChangeUnregister);
    (<Sinon.SinonStub>sectionContext.onCurrentBookChange).returns(onCurrentBookChangeUnregister);
    (<Sinon.SinonStub>sectionContext.onCurrentChapterChange).returns(onCurrentChapterChangeUnregister);
  });

  describe('constructor', () => {
    it('should create a new sectionContext', async() => {
      // given
      (<Sinon.SinonStub>sectionContextFactory.create).returns(sectionContext);

      // when
      studySection = createStudySection();

      // then
      assert.strictEqual(studySection.sectionContext, sectionContext);
    });

    it('should listen for changes on bibleStore', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.isTrue((<Sinon.SinonStub>bibleStore.onChange).calledOnce);
    });

    describe('when bibleStore.bibles change', () => {

      it('should update the bibles in the sectionContext when the bibles in the bibleStore change', async() => {
        // assume
        const bibles = [aBible()];

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>bibleStore.onChange).args[0][0];
        await callback(bibles);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setBibles).calledWith(bibles));
      });

      it(`should set the current bible in the sectionContext with the first bible when the bibles in the bibleStore change and current bible is not yet set`, async() => {
        // assume
        const bibles = [aBible(), aBible()];

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>bibleStore.onChange).args[0][0];
        await callback(bibles);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setCurrentBible).calledWith(bibles[0]));
      });

    });

    it('should listen to updates of current bible in sectionContext', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentBibleChange).calledOnce);
    });

    it('should stop listening to updates of current bible in sectionContext when unregistered', async() => {
      // given
      studySection = createStudySection();

      // when
      studySection.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onCurrentBibleChangeUnregister).calledOnce);
    });

    describe('when sectionContext.currentBible changes', () => {

      it('should reload the books for the current bible', async() => {
        // assume
        const bible = aBible();
        const books: Book[] = [aBook(1), aBook(2)];

        // given
        (<Sinon.SinonStub>bookService.fetchBooks).withArgs(bible._id).returns(books);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).args[0][0];
        await callback(bible);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setBooks).calledWith(books));
      });

      it('should update the current book', async() => {
        // assume
        const bible = aBible();
        const books: Book[] = [aBook(1), aBook(2)];

        // given
        (<Sinon.SinonStub>bookService.fetchBooks).withArgs(bible._id).returns(books);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).args[0][0];
        await callback(bible);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setCurrentBook).calledWith(books[0]));
      });

      it('should use book with same number as the previous one', async() => {
        // assume
        const bible = aBible();
        const books: Book[] = [aBook(1, 1), aBook(2, 2), aBook(3, 3)];
        const previousBook: Book = aBook(6, 2);

        // given
        (<any>sectionContext)._currentBook = previousBook;
        (<Sinon.SinonStub>bookService.fetchBooks).withArgs(bible._id).returns(books);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).args[0][0];
        await callback(bible);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setCurrentBook).calledWith(books[1]));
      });

      it('should use books from bible instead of loading from server when bible has already some', async() => {
        // assume
        const bible = aBible();
        const books: Book[] = [aBook(1, 1), aBook(2, 2), aBook(3, 3)];
        bible.books = books;

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).args[0][0];
        await callback(bible);

        // then
        assert.isTrue((<Sinon.SinonStub>bookService.fetchBooks).notCalled);
        assert.isTrue((<Sinon.SinonStub>sectionContext.setBooks).calledWith(books));
      });

    });

    it('should listen to updates of current book in sectionContext', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentBookChange).calledOnce);
    });

    it('should stop listening to updates of current book in sectionContext when unregistered', async() => {
      // given
      studySection = createStudySection();

      // when
      studySection.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onCurrentBookChangeUnregister).calledOnce);
    });

    describe('when sectionContext.currentBook changes', () => {

      it('should reload and update the chapters for the current book', async() => {
        // assume
        const book = aBook(1);
        const chapters: Chapter[] = [aChapter(1), aChapter(2)];

        // given
        (<Sinon.SinonStub>chapterService.fetchChapters).withArgs(book._id).returns(chapters);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBookChange).args[0][0];
        await callback(book);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setChapters).calledWith(chapters));
        assert.strictEqual(book.chapters, chapters);
      });

      it('should update the current chapter', async() => {
        // assume
        const book = aBook();
        const chapters: Chapter[] = [aChapter(1), aChapter(2)];

        // given
        (<Sinon.SinonStub>chapterService.fetchChapters).withArgs(book._id).returns(chapters);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBookChange).args[0][0];
        await callback(book);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setCurrentChapter).calledWith(chapters[0]));
      });

      it('should use chapter with same number as the previous one if the new book has the same number as the previous one', async() => {
        // assume
        const newBook = aBook(1, 4);
        const previousBook = aBook(2, 4);
        const chapters: Chapter[] = [aChapter(1, 1), aChapter(2, 2), aChapter(3, 3)];
        const previousChapter: Chapter = aChapter(6, 2);

        // given
        (<any>sectionContext)._currentChapter = previousChapter;
        (<any>sectionContext)._currentbook = previousBook;
        (<Sinon.SinonStub>chapterService.fetchChapters).withArgs(newBook._id).returns(chapters);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBookChange).args[0][0];
        await callback(newBook, previousBook);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setCurrentChapter).calledWith(chapters[1]));
      });

      it('should use chapters from book instead of loading from server when book has already some', async() => {
        // assume
        const book = aBook();
        const chapters: Chapter[] = [aChapter(1, 1), aChapter(2, 2), aChapter(3, 3)];
        book.chapters = chapters;

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentBookChange).args[0][0];
        await callback(book);

        // then
        assert.isTrue((<Sinon.SinonStub>chapterService.fetchChapters).notCalled);
        assert.isTrue((<Sinon.SinonStub>sectionContext.setChapters).calledWith(chapters));
      });

    });

    it('should listen to updates of current chapter in sectionContext', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentChapterChange).calledOnce);
    });

    it('should stop listening to updates of current chapter in sectionContext when unregistered', async() => {
      // given
      studySection = createStudySection();

      // when
      studySection.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onCurrentChapterChangeUnregister).calledOnce);
    });

    describe('when sectionContext.currentChapter changes', () => {

      it('should reload and update the verses for the current chapter', async() => {
        // assume
        const chapter = aChapter(1);
        const verses: Verse[] = [aVerse(1), aVerse(2)];

        // given
        (<Sinon.SinonStub>verseService.fetchVerses).withArgs(chapter._id).returns(verses);

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentChapterChange).args[0][0];
        await callback(chapter);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.setVerses).calledWith(verses));
        assert.strictEqual(chapter.verses, verses);
      });

      it('should use verses from chapter instead of loading from server when chapter has already some', async() => {
        // assume
        const chapter = aChapter();
        const verses: Verse[] = [aVerse(1, 1), aVerse(2, 2), aVerse(3, 3)];
        chapter.verses = verses;

        // when
        studySection = createStudySection();
        const callback = (<Sinon.SinonStub>sectionContext.onCurrentChapterChange).args[0][0];
        await callback(chapter);

        // then
        assert.isTrue((<Sinon.SinonStub>verseService.fetchVerses).notCalled);
        assert.isTrue((<Sinon.SinonStub>sectionContext.setVerses).calledWith(verses));
      });

    });

    it('should create a studySectionMenu', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.strictEqual(studySection.studySectionMenu, studySectionMenu);
    });

    it('should call unregister function from studySectionMenu when unregistering', async() => {
      // given
      studySection = createStudySection();

      // ensure
      assert.isTrue((<Sinon.SinonStub>studySectionMenu.unregister).notCalled);

      // when
      studySection.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>studySectionMenu.unregister).calledOnce);
    });

    it('should create a verseList', async() => {
      // when
      studySection = createStudySection();

      // then
      assert.strictEqual(studySection.verseList, verseList);
    });

    describe('onContinousModeChange', () => {
      it('should listen for changes on continuousMode', async() => {
        // assume
        const listener = Sinon.stub();

        // given
        studySection = createStudySection();
        studySection.onContinousModeChange(listener);

        // when
        await studySection.switchDisplayMode();

        // then
        assert.isTrue((<Sinon.SinonStub>listener).calledOnce);
      });
    });

    describe('onVersesChange', () => {
      it('should listen for changes on continuousMode', async() => {
        // assume
        const listener = Sinon.stub();
        const unregisterFunction = Sinon.stub();

        // given
        studySection = createStudySection();
        (<Sinon.SinonStub>sectionContext.onVersesChange).returns(unregisterFunction);

        // when
        const result = studySection.onVersesChange(listener);

        // then
        assert.isTrue((<Sinon.SinonStub>sectionContext.onVersesChange).calledWith(listener));
        assert.strictEqual(result, unregisterFunction);
      });
    });
  });

  function createStudySection() {
    return new StudySection(bibleStore, bookService, chapterService, verseService, verseListFactory, sectionContextFactory,
      studySectionMenuFactory, loggerFactory);
  }

  function aBible(prefix?: string): Bible {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

  function aBook(bookId?: number, bookNumber?: number): Book {
    bookId = bookId || 1;
    const book: Book = new Book();
    book.name = `${bookId}_test_book`;
    book._id = `${bookId}_test_book_id`;
    book.number = bookNumber || bookId;
    book.numberOfChapters = 50;
    return book;
  }

  function aChapter(chapterId?: number, chapterNumber?: number): Chapter {
    chapterId = chapterId || 1;
    const chapter: Chapter = new Chapter();
    chapter._id = `${chapterId}_test_chapter_id`;
    chapter.number = chapterNumber || chapterId;
    return chapter;
  }

  function aVerse(verseId?: number, verseNumber?: number): Verse {
    verseId = verseId || 1;
    const verse: Verse = new Verse();
    verse._id = `${verseId}_test_verse_id`;
    verse.numbers = [verseNumber || verseId];
    return verse;
  }
});
