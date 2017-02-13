import * as React from "react";
import * as Helmet from "react-helmet";
import WorkspaceComponent from "../components/workspace/WorkspaceComponent";
import {Workspace} from "../components/workspace/Workspace";
import {ServiceContainer} from "../components/common/ServiceContainer";
import {StoreContainer} from "../components/common/StoreContainer";

export default class WorkspaceView extends React.Component<any,any> {
  private _workspace: Workspace;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const serviceContainer = new ServiceContainer();
    const storeContainer = new StoreContainer();
    this._workspace = new Workspace(storeContainer, serviceContainer);
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
