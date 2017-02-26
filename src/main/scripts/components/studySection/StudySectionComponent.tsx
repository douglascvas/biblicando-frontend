import {StudySection} from "./StudySection";
import * as React from "react";
import StudySectionMenuComponent from "./menu/StudySectionMenuComponent";
import VerseListComponent from "../verse/verseList/VerseListComponent";

export interface StudySectionProperties {
  id: string,
  studySection: StudySection
}

export default class StudySectionComponent extends React.Component<StudySectionProperties,StudySection> {
  page: StudySection;
  private _unregisterFunctions: Function[];

  constructor(properties: StudySectionProperties) {
    super(properties);

    this._unregisterFunctions = [];
    this.switchDisplayMode = this.switchDisplayMode.bind(this);
  }

  public componentWillMount() {
    const onVersesChange = this.props.studySection.onVersesChange(() => this.studySectionChanged());
    const onContinousModeChangeUnregister = this.props.studySection.onContinousModeChange(() => this.studySectionChanged());
    this._unregisterFunctions.push(onContinousModeChangeUnregister, onVersesChange);
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

    const displayModeIconClass = this.props.studySection.continousMode ? 'fa-bars' : 'fa-ellipsis-h';
    const displayModeVerseListClass = this.props.studySection.continousMode ? 'continuous' : '';

    return (
      <bc-study-section>
        <StudySectionMenuComponent id={`${this.props.id}:study-section`} studySectionMenu={this.props.studySection.studySectionMenu}/>

        <div className="study-section__body">
          <div className="study-section__content">
            <div className="study-section__display-mode" onClick={this.switchDisplayMode}>
              <i className={`fa ${displayModeIconClass}`} aria-hidden="true"></i>
            </div>
            <h4 className="center study-section__book-name">
              {`${currentBook.name || ''} ${currentChapter.number || ''}`}
            </h4>
            <h6 className="center study-section__bible-name">
              {`${currentBible.name || ''}`}
            </h6>
            <VerseListComponent id={`${this.props.id}:verse-list`} className={`verse-list ${displayModeVerseListClass}`}
                                verseList={this.props.studySection.verseList}/>
          </div>
        </div>
      </bc-study-section>
    )
  }
}
