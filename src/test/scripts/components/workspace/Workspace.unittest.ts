import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {Workspace} from "../../../../main/scripts/components/workspace/Workspace";
import {Factory} from "../../../../main/scripts/components/common/BasicFactory";
import {StudySection} from "../../../../main/scripts/components/studySection/StudySection";
import {BibleService} from "../../../../main/scripts/components/bible/BibleService";
import {BibleStore} from "../../../../main/scripts/components/bible/BibleStore";
import {StudySectionFactory} from "../../../../main/scripts/components/studySection/StudySectionFactory";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('Workspace', () => {
  let workspace: Workspace,
    studySectionFactory: Factory<StudySection>,
    bibleService: BibleService,
    bibleStore: BibleStore,
    loggerFactory: LoggerFactory;

  beforeEach(() => {
    studySectionFactory = <any>Sinon.createStubInstance(StudySectionFactory);
    bibleService = <any>Sinon.createStubInstance(BibleService);
    bibleStore = <any>Sinon.createStubInstance(BibleStore);
    loggerFactory = new TestLoggerFactory();
    workspace = new Workspace(studySectionFactory, bibleService, bibleStore, loggerFactory);
  });

  describe('Initialize', () => {
    it('should create an initial study section', async() => {
      // given
      const studySection: StudySection = aStudySection();
      (<Sinon.SinonStub>bibleService.fetchBibles).returns([aBible()]);
      (<Sinon.SinonStub>studySectionFactory.create).returns(studySection);

      // when
      await workspace.initialize();

      // then
      assert.sameMembers(workspace.sections, [studySection]);
    });

    it('should load the bibles from the server and save in the BibleStore', async() => {
      // assume
      const bibles = [aBible('1'), aBible('2')];

      // given
      (<Sinon.SinonStub>bibleService.fetchBibles).returns(bibles);

      // when
      await workspace.initialize();

      // then
      assert.isTrue((<Sinon.SinonStub>bibleStore.replaceAll).calledWith(bibles));
    });
  });

  describe('loadBibles', () => {
    it('should load the bibles from the server and save in the BibleStore', async() => {
      // assume
      const bibles = [aBible('1'), aBible('2')];

      // given
      (<Sinon.SinonStub>bibleService.fetchBibles).returns(bibles);

      // when
      await workspace.initialize();

      // then
      assert.isTrue((<Sinon.SinonStub>bibleStore.replaceAll).calledWith(bibles));
    });
  });

  describe('createSection', () => {
    it('should create a new section, add it to the list of sections and return it', async() => {
      // given
      (<Sinon.SinonStub>bibleService.fetchBibles).returns([]);
      (<Sinon.SinonStub>studySectionFactory.create).returns(aStudySection());
      await workspace.initialize();

      // when
      const newSection = workspace.createSection();

      // then
      assert.strictEqual(workspace.sections.length, 2);
      assert.strictEqual(workspace.sections[1], newSection);
    });
  });

  describe('removeSection', () => {
    it('should remove a section', async() => {
      // given
      studySectionFactory.create = aStudySection;
      (<Sinon.SinonStub>bibleService.fetchBibles).returns([]);
      await workspace.initialize();
      const newSection = workspace.createSection();

      // when
      workspace.removeSection(newSection);

      // then
      assert.strictEqual(workspace.sections.length, 1);
      assert.notStrictEqual(workspace.sections[0], newSection);
    });

    it('should unregister the section before removing it', async() => {
      // given
      studySectionFactory.create = aStudySection;
      (<Sinon.SinonStub>bibleService.fetchBibles).returns([]);
      await workspace.initialize();
      const newSection = workspace.createSection();

      // when
      workspace.removeSection(newSection);

      // then
      assert.isTrue((<Sinon.SinonStub>newSection.unregister).calledOnce);
    });
  });

  function aStudySection(): StudySection {
    return Sinon.createStubInstance(StudySection);
  }

  function aBible(prefix?: string) {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

});
