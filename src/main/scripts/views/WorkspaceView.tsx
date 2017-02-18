import * as React from "react";
import * as Helmet from "react-helmet";
import WorkspaceComponent from "../components/workspace/WorkspaceComponent";
import {Workspace} from "../components/workspace/Workspace";
import {WorkspaceFactory} from "../components/workspace/WorkspaceFactory";
import {Container} from "../components/common/Container";

export default class WorkspaceView extends React.Component<any,any> {
  private _workspace: Workspace;

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const container = new Container();
    this._workspace = new WorkspaceFactory(container).create();
    await this._workspace.initialize();
  }

  render() {
    return (
      <div>
        <Helmet title='Biblicando'/>
        <WorkspaceComponent id="biblicando" workspace={this._workspace}/>
      </div>
    );
  }
}
