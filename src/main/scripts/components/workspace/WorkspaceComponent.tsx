import * as React from "react";
import {StudySection} from "../studySection/StudySection";
import {Workspace} from "./Workspace";
import StudySectionComponent from "../studySection/StudySectionComponent";

export interface WorkspaceProps {
  id: string;
  className?: string;
  workspace: Workspace;
}

export default class WorkspaceComponent extends React.Component<WorkspaceProps, Workspace> {
  constructor(props: WorkspaceProps) {
    super(props);
  }

  render() {
    const sections = this.props.workspace.sections.map((section: StudySection, index: number) => (
      <StudySectionComponent id={`${this.props.id}:study-section-${index}`} key={`study-section-${index}`} studySection={section}/>
    ));

    return (
      <bc-workspace id={this.props.id} class={this.props.className}>
        {sections}
      </bc-workspace>
    )
  }
}
