import {StudySection} from "./StudySection";
import * as React from "react";
import MenuBarComponent from "../../menuBar/MenuBarComponent";

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

    this.state.onContinousModeChange(() => this.studySectionChanged());
  }

  private studySectionChanged() {
    this.setState(this.state);
  }

  private switchDisplayMode() {
    this.state.switchDisplayMode();
  }

  public render() {
    const displayModeClass = this.continuousVerses ? 'fa-bars' : 'fa-ellipsis-h';
    return (
      <div>
        <MenuBarComponent id={`bible-page:${this.props.id}`} menuBar={this.state.menuBar}/>

        <div class="bible-page__body">
          <div class="bible-page__content">
            <div class="bible-page__display-mode" onClick={() => this.switchDisplayMode()}>
              <i class={`fa ${displayModeClass}`} aria-hidden="true"></i>
            </div>
            <h4 class="center bible-page__book-name">
              {this.state.currentBook.name + ' ' + this.state.currentChapter.number}
            </h4>
            <h6 class="center bible-page__bible-name">
              {this.page.currentBible.name}
            </h6>
            {/*<VerseList class={`verse-list ${this.continuousVerses ? 'continuous' : ''}`} verses={this.page.currentVerses}/>*/}
          </div>
        </div>
      </div>
    )
  }
}
