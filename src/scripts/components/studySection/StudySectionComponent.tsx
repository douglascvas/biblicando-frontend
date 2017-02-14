import {StudySection} from "./StudySection";
import * as React from "react";
import StudySectionMenuComponent from "../menuBar/StudySectionMenuComponent";

export interface StudySectionProperties {
  id: string,
  studySection: StudySection
}

export default class StudySectionComponent extends React.Component<StudySectionProperties,StudySection> {
  page: StudySection;
  public continuousVerses: boolean;
  private _unregisterFunctions: Function[];

  constructor(properties: StudySectionProperties) {
    super(properties);

    this._unregisterFunctions = [];
    this.switchDisplayMode = this.switchDisplayMode.bind(this);
  }

  public componentWillMount() {
    const onContinousModeChangeUnregister = this.props.studySection.onContinousModeChange(() => this.studySectionChanged());
    this._unregisterFunctions.push(onContinousModeChangeUnregister);
  }

  public componentWillUnmount() {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private studySectionChanged() {
    this.setState({});
  }

  private switchDisplayMode() {
    this.props.studySection.switchDisplayMode();
  }

  public render() {
    const currentBook = this.props.studySection.getCurrentBook() || {} as any;
    const currentChapter = this.props.studySection.getCurrentChapter() || {} as any;
    const currentBible = this.props.studySection.getCurrentBible() || {} as any;

    const displayModeClass = this.continuousVerses ? 'fa-bars' : 'fa-ellipsis-h';

    return (
      <div>
        <StudySectionMenuComponent id={`study-section:${this.props.id}`} studySectionMenu={this.props.studySection.studySectionMenu}/>

        <div className="study-section__body">
          <div className="study-section__content">
            <div className="study-section__display-mode" onClick={this.switchDisplayMode}>
              <i className={`fa ${displayModeClass}`} aria-hidden="true"></i>
            </div>
            <h4 className="center study-section__book-name">
              {`${currentBook.name || ''} ${currentChapter.number || ''}`}
            </h4>
            <h6 className="center study-section__bible-name">
              {`${currentBible.name || ''}`}
            </h6>
            {/*<VerseList className={`verse-list ${this.continuousVerses ? 'continuous' : ''}`} verses={this.page.currentVerses}/>*/}
          </div>
        </div>
      </div>
    )
  }
}
