import * as React from "react";
import {StudySection} from "../bible/biblePage/StudySection";
import {Workspace} from "./Workspace";
import StudySectionComponent from "../bible/biblePage/StudySectionComponent";
export interface BibleStudyProps {
  id: string;
  className?: string;
  workspace: Workspace;
}

export default class WorkspaceComponent extends React.Component<BibleStudyProps, Workspace> {
  constructor(props: BibleStudyProps) {
    super(props);

    this.state = props.workspace;
  }

  render() {
    const sections = this.state.sections.map((section: StudySection, index: number) => (
      <StudySectionComponent id={`study-section-${index}:${this.props.id}`} key={`study-section-${index}`} studySection={section}/>
    ));

    return (
      <div className={this.props.className}>
        {sections}
      </div>
    )
  }
}
