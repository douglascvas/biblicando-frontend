import {shallow, ShallowWrapper} from "enzyme";
import * as React from "react";
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
import WorkspaceComponent from "../../../../main/scripts/components/workspace/WorkspaceComponent";
import StudySectionComponent from "../../../../main/scripts/components/studySection/StudySectionComponent";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('WorkspaceComponent', () => {
  let workspace: Workspace,
    workspaceComponent: JSX.Element,
    studySectionFactory: Factory<StudySection>,
    bibleService: BibleService,
    bibleStore: BibleStore,
    loggerFactory: LoggerFactory,
    studySection: StudySection;

  beforeEach(async() => {
    studySectionFactory = Sinon.createStubInstance(StudySectionFactory);
    bibleService = Sinon.createStubInstance(BibleService);
    bibleStore = Sinon.createStubInstance(BibleStore);
    loggerFactory = new TestLoggerFactory();

    studySection = Sinon.createStubInstance(StudySection);
    (studySectionFactory.create as Sinon.SinonStub).returns(studySection);
    (bibleService.fetchBibles as Sinon.SinonStub).returns([]);

    workspace = new Workspace(studySectionFactory, bibleService, bibleStore, loggerFactory);
    await workspace.initialize();
    workspaceComponent = <WorkspaceComponent id="test-workspace" workspace={workspace} className="test-css-class"/>;
  });

  it('should render component as bc-workspace tag', async() => {
    // when
    const wrapper: ShallowWrapper<any,any> = shallow(workspaceComponent);

    // then
    assert.strictEqual(wrapper.type(), 'bc-workspace');
    assert.strictEqual(wrapper.props().id, 'test-workspace');
    assert.strictEqual(wrapper.props().class, 'test-css-class');
  });

  it('should render initially a study section', async() => {
    // when
    const wrapper: ShallowWrapper<any,any> = shallow(workspaceComponent);

    // then
    let studySectionComponent = wrapper.childAt(0);
    assert.strictEqual(studySectionComponent.type(), StudySectionComponent);
    assert.strictEqual(studySectionComponent.props().id, 'test-workspace:study-section-0');
    assert.strictEqual(studySectionComponent.key(), 'study-section-0');
    assert.strictEqual(studySectionComponent.props().studySection, studySection);
  });

});
