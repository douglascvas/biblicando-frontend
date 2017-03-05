import {StudySection} from "../../../../main/scripts/components/studySection/StudySection";
import {ShallowWrapper, shallow} from "enzyme";
import {assert} from "chai";
import * as React from "react";
import * as Sinon from "sinon";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
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
import StudySectionComponent from "../../../../main/scripts/components/studySection/StudySectionComponent";
import StudySectionMenuComponent from "../../../../main/scripts/components/studySection/menu/StudySectionMenuComponent";

describe('StudySectionComponent', () => {
  let studySection: StudySection,
    studySectionComponent: JSX.Element,
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

    (sectionContextFactory.create as Sinon.SinonStub).returns(sectionContext);
    (studySectionMenuFactory.create as Sinon.SinonStub).returns(studySectionMenu);
    (verseListFactory.create as Sinon.SinonStub).returns(verseList);

    (bibleStore.onChange as Sinon.SinonStub).returns(onBiblesChangeUnregister);
    (sectionContext.onCurrentBibleChange as Sinon.SinonStub).returns(onCurrentBibleChangeUnregister);
    (sectionContext.onCurrentBookChange as Sinon.SinonStub).returns(onCurrentBookChangeUnregister);
    (sectionContext.onCurrentChapterChange as Sinon.SinonStub).returns(onCurrentChapterChangeUnregister);

    studySection = new StudySection(bibleStore, bookService, chapterService, verseService, verseListFactory, sectionContextFactory,
      studySectionMenuFactory, loggerFactory);

    studySectionComponent = <StudySectionComponent id="test-section" studySection={studySection}/>;
  });

  it('should render component as bc-study-section tag', async() => {
    // when
    const wrapper: ShallowWrapper<any,any> = shallow(studySectionComponent);

    // then
    assert.strictEqual(wrapper.type(), 'bc-study-section');
    assert.strictEqual(wrapper.props().id, 'test-section');
  });

  it('should render the study section menu', async() => {
    // when
    const wrapper: ShallowWrapper<any,any> = shallow(studySectionComponent);

    // then
    let studySectionMenuComponent = wrapper.childAt(0);
    assert.strictEqual(studySectionMenuComponent.type(), StudySectionMenuComponent);
    assert.strictEqual(studySectionMenuComponent.props().id, 'test-section:study-section-menu');
    assert.strictEqual(studySectionMenuComponent.props().studySectionMenu, studySectionMenu);
  });

  it('should render the study section body', async() => {
    // when
    const wrapper: ShallowWrapper<any,any> = shallow(studySectionComponent);

    // then
    let studySectionBodyWrapper = wrapper.childAt(1);
    assert.strictEqual(studySectionBodyWrapper.type(), 'div');
    assert.strictEqual(studySectionBodyWrapper.props().className, 'study-section__body');

    let studySectionBodyContent = studySectionBodyWrapper.childAt(0);
    assert.strictEqual(studySectionBodyContent.type(), 'div');
    assert.strictEqual(studySectionBodyContent.props().className, 'study-section__content');

    // TODO: FINISH TEST
  });

});
