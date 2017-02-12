import {StudySection} from "./StudySection";
import * as React from "react";
import MenuBarComponent from "../menuBar/MenuBarComponent";

export interface StudySectionProperties {
  id: string,
  studySection: StudySection
}

export default class StudySectionComponent extends React.Component<StudySectionProperties,StudySection> {
  page: StudySection;
  public continuousVerses: boolean;

  constructor(properties: StudySectionProperties) {
    super(properties);

    this.state = properties.studySection;

    this.switchDisplayMode = this.switchDisplayMode.bind(this);
    this.state.onContinousModeChange(() => this.studySectionChanged());
  }

  private studySectionChanged() {
    this.setState(this.state);
  }

  private switchDisplayMode() {
    this.state.switchDisplayMode();
  }

  public render() {
    const currentBook = this.state.currentBook || {} as any;
    const currentChapter = this.state.currentChapter || {} as any;
    const currentBible = this.state.currentBible || {} as any;
    const displayModeClass = this.continuousVerses ? 'fa-bars' : 'fa-ellipsis-h';

    return (
      <div>
        <MenuBarComponent id={`bible-page:${this.props.id}`} menuBar={this.state.menuBar}/>

        <div className="bible-page__body">
          <div className="bible-page__content">
            <div className="bible-page__display-mode" onClick={this.switchDisplayMode}>
              <i className={`fa ${displayModeClass}`} aria-hidden="true"></i>
            </div>
            <h4 className="center bible-page__book-name">
              {`${currentBook.name || ''} ${currentChapter.number || ''}`}
            </h4>
            <h6 className="center bible-page__bible-name">
              {`${currentBible.name || ''}`}
            </h6>
            {/*<VerseList className={`verse-list ${this.continuousVerses ? 'continuous' : ''}`} verses={this.page.currentVerses}/>*/}
          </div>
        </div>
      </div>
    )
  }
}
