import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../../main/scripts/components/common/logger/LoggerFactory";
import {Chapter} from "../../../../../main/scripts/components/chapter/Chapter";
import {MenuFactory} from "../../../../../main/scripts/components/common/MenuFactory";
import {Book} from "../../../../../main/scripts/components/book/Book";
import {Bible} from "../../../../../main/scripts/components/bible/Bible";
import {Overlay} from "../../../../../main/scripts/components/menu/Overlay";
import {Factory} from "../../../../../main/scripts/components/common/BasicFactory";
import {OverlayFactory} from "../../../../../main/scripts/components/menu/OverlayFactory";
import {BibleMenuFactory} from "../../../../../main/scripts/components/bible/bibleMenu/BibleMenuFactory";
import {BookMenuFactory} from "../../../../../main/scripts/components/book/bookMenu/BookMenuFactory";
import {ChapterMenuFactory} from "../../../../../main/scripts/components/chapter/chapterMenu/ChapterMenuFactory";
import {TestLoggerFactory} from "../../common/logger/TestLoggerFactory";
import {StudySectionMenu} from "../../../../../main/scripts/components/studySection/menu/StudySectionMenu";
import {BibleMenu} from "../../../../../main/scripts/components/bible/bibleMenu/BibleMenu";
import {BookMenu} from "../../../../../main/scripts/components/book/bookMenu/BookMenu";
import {ChapterMenu} from "../../../../../main/scripts/components/chapter/chapterMenu/ChapterMenu";
import {SectionContext} from "../../../../../main/scripts/components/studySection/SectionContext";

describe('StudySectionMenu', () => {
  let studySectionMenu: StudySectionMenu,
    overlayFactory: Factory<Overlay>,
    bibleMenuFactory: MenuFactory<Bible>,
    bookMenuFactory: MenuFactory<Book>,
    chapterMenuFactory: MenuFactory<Chapter>,
    loggerFactory: LoggerFactory,
    bibleMenu: BibleMenu,
    bookMenu: BookMenu,
    chapterMenu: ChapterMenu,
    overlay: Overlay,
    sectionContext: SectionContext,

    onBibleSelectUnsubscribe: Function,
    onBookSelectUnsubscribe: Function,
    onChapterSelectUnsubscribe: Function,
    onCurrentBibleChangeUnsubscribe: Function,
    onCurrentBookChangeUnsubscribe: Function,
    onCurrentChapterChangeUnsubscribe: Function;

  beforeEach(() => {
    onBibleSelectUnsubscribe = Sinon.stub();
    onBookSelectUnsubscribe = Sinon.stub();
    onChapterSelectUnsubscribe = Sinon.stub();
    onCurrentBibleChangeUnsubscribe = Sinon.stub();
    onCurrentBookChangeUnsubscribe = Sinon.stub();
    onCurrentChapterChangeUnsubscribe = Sinon.stub();

    overlayFactory = Sinon.createStubInstance(OverlayFactory);
    bibleMenuFactory = Sinon.createStubInstance(BibleMenuFactory);
    bookMenuFactory = Sinon.createStubInstance(BookMenuFactory);
    chapterMenuFactory = Sinon.createStubInstance(ChapterMenuFactory);
    sectionContext = Sinon.createStubInstance(SectionContext);
    loggerFactory = new TestLoggerFactory();

    bibleMenu = Sinon.createStubInstance(BibleMenu);
    bookMenu = Sinon.createStubInstance(BookMenu);
    chapterMenu = Sinon.createStubInstance(ChapterMenu);
    (<Sinon.SinonStub>bibleMenu.onSelect).returns(onBibleSelectUnsubscribe);
    (<Sinon.SinonStub>bookMenu.onSelect).returns(onBookSelectUnsubscribe);
    (<Sinon.SinonStub>chapterMenu.onSelect).returns(onChapterSelectUnsubscribe);
    (<Sinon.SinonStub>sectionContext.onCurrentBibleChange).returns(onCurrentBibleChangeUnsubscribe);
    (<Sinon.SinonStub>sectionContext.onCurrentBookChange).returns(onCurrentBookChangeUnsubscribe);
    (<Sinon.SinonStub>sectionContext.onCurrentChapterChange).returns(onCurrentChapterChangeUnsubscribe);

    overlay = Sinon.createStubInstance(BibleMenu);

    (<Sinon.SinonStub>overlayFactory.create).returns(overlay);
    (<Sinon.SinonStub>bibleMenuFactory.create).withArgs(overlay).returns(bibleMenu);
    (<Sinon.SinonStub>bookMenuFactory.create).withArgs(overlay).returns(bookMenu);
    (<Sinon.SinonStub>chapterMenuFactory.create).withArgs(overlay).returns(chapterMenu);
  });

  describe('constructor', () => {
    it('should create an overlay', async() => {
      // when
      studySectionMenu = createStudySectionMenu();

      // then
      assert.strictEqual(studySectionMenu.overlay, overlay);
    });

    it('should hide bible menu when a bible is selected', async() => {
      // when
      studySectionMenu = createStudySectionMenu();
      const callback = (<Sinon.SinonStub>bibleMenu.onSelect).args[0][0];
      callback();

      // then
      assert.isTrue((<Sinon.SinonStub>bibleMenu.hide).calledOnce);
    });

    it('should hide book menu when a book is selected', async() => {
      // when
      studySectionMenu = createStudySectionMenu();
      const callback = (<Sinon.SinonStub>bookMenu.onSelect).args[0][0];
      callback();

      // then
      assert.isTrue((<Sinon.SinonStub>bookMenu.hide).calledOnce);
    });

    it('should hide chapter menu when a chapter is selected', async() => {
      // when
      studySectionMenu = createStudySectionMenu();
      const callback = (<Sinon.SinonStub>chapterMenu.onSelect).args[0][0];
      callback();

      // then
      assert.isTrue((<Sinon.SinonStub>chapterMenu.hide).calledOnce);
    });
  });

  describe('menuButtonClicked', () => {
    it('should hide bible and chapter menus when book menu button is clicked', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.menuButtonClicked(bookMenu);

      // then
      assert.isTrue((<Sinon.SinonStub>bibleMenu.hide).calledOnce);
      assert.isTrue((<Sinon.SinonStub>chapterMenu.hide).calledOnce);
    });

    it('should hide book and chapter menus when bible menu button is clicked', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.menuButtonClicked(bibleMenu);

      // then
      assert.isTrue((<Sinon.SinonStub>bookMenu.hide).calledOnce);
      assert.isTrue((<Sinon.SinonStub>chapterMenu.hide).calledOnce);
    });

    it('should hide book and chapter menus when bible menu button is clicked', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.menuButtonClicked(chapterMenu);

      // then
      assert.isTrue((<Sinon.SinonStub>bibleMenu.hide).calledOnce);
      assert.isTrue((<Sinon.SinonStub>bookMenu.hide).calledOnce);
    });
  });

  describe('overlayClicked', () => {
    it('should hide all menus when overlay is clicked', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.overlayClicked();

      // then
      assert.isTrue((<Sinon.SinonStub>bibleMenu.hide).calledOnce);
      assert.isTrue((<Sinon.SinonStub>bookMenu.hide).calledOnce);
      assert.isTrue((<Sinon.SinonStub>chapterMenu.hide).calledOnce);
    });
  });

  describe('onCurrentDataChange', () => {
    it('should register onCurrentBibleChange, onCurrentBookChange and onCurrentChapterChange', async() => {
      // given
      let callback = () => null;
      studySectionMenu = createStudySectionMenu();

      // when
      studySectionMenu.onCurrentDataChange(callback);

      // then
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentBibleChange).calledWith(callback));
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentBookChange).calledWith(callback));
      assert.isTrue((<Sinon.SinonStub>sectionContext.onCurrentChapterChange).calledWith(callback));
    });
  });

  describe('getCurrentBible', () => {
    it('should return current bible', async() => {
      // given
      sectionContext = <any>{currentBible: {name: 'test'}};
      studySectionMenu = createStudySectionMenu();

      // when
      let currentBible = studySectionMenu.getCurrentBible();

      // then
      assert.strictEqual(currentBible, sectionContext.currentBible);
    });
  });

  describe('getCurrentBook', () => {
    it('should return current book', async() => {
      // given
      sectionContext = <any>{currentBook: {name: 'test'}};
      studySectionMenu = createStudySectionMenu();

      // when
      let currentBook = studySectionMenu.getCurrentBook();

      // then
      assert.strictEqual(currentBook, sectionContext.currentBook);
    });
  });

  describe('getCurrentChapter', () => {
    it('should return current book', async() => {
      // given
      sectionContext = <any>{currentChapter: {name: 'test'}};
      studySectionMenu = createStudySectionMenu();

      // when
      let currentChapter = studySectionMenu.getCurrentChapter();

      // then
      assert.strictEqual(currentChapter, sectionContext.currentChapter);
    });
  });

  describe('unregister', () => {
    it('should unregister onSelect listener for bibleMenu', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onBibleSelectUnsubscribe).calledOnce);
    });

    it('should unregister onSelect listener for bookMenu', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onBookSelectUnsubscribe).calledOnce);
    });

    it('should unregister onSelect listener for chapterMenu', async() => {
      // given
      studySectionMenu = createStudySectionMenu();

      // when
      await studySectionMenu.unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onChapterSelectUnsubscribe).calledOnce);
    });

    it('should unregister onCurrentBibleChange, onCurrentBookChange and onCurrentChapterChange', async() => {
      // given
      studySectionMenu = createStudySectionMenu();
      let unregister = studySectionMenu.onCurrentDataChange(() => null);

      // when
      unregister();

      // then
      assert.isTrue((<Sinon.SinonStub>onCurrentBibleChangeUnsubscribe).calledOnce);
      assert.isTrue((<Sinon.SinonStub>onCurrentBookChangeUnsubscribe).calledOnce);
      assert.isTrue((<Sinon.SinonStub>onCurrentChapterChangeUnsubscribe).calledOnce);
    });
  });

  function createStudySectionMenu() {
    return studySectionMenu = new StudySectionMenu(overlayFactory, sectionContext, bibleMenuFactory, bookMenuFactory, chapterMenuFactory, loggerFactory);
  }

});
