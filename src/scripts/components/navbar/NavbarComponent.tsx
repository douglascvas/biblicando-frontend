import * as React from 'react';

export default class NavbarComponent extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  public render() {
    const loadingSpinner = this.state.loaded ? '' : (
        <li className="loader">
          <i className="fa fa-spinner fa-spin fa-2x"></i>
        </li>
      );

    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="nav-wrapper">
          <a className="brand-logo left" href="#">
            Biblicando...
          </a>

          {/*<!--*/}
          {/*<ul className="right">-->*/}
          {/*<!--*/}
          {/*<li>-->*/}
          {/*<!--<a href="javascript:void(0)">-->*/}
          {/*<!--<i className="fa fa-globe material-icons left" aria-hidden="true"></i> Version-->*/}
          {/*<!--</a>-->*/}
          {/*<!--*/}
          {/*</li>*/}
          {/*-->*/}
          {/*<!--*/}
          {/*<li repeat.for="row of router.navigation" className="${row.isActive ? 'active' : ''}">-->*/}
          {/*<!--<a data-toggle="collapse"-->*/}
          {/*<!--data-target="#bs-example-navbar-collapse-1.in"-->*/}
          {/*<!--href.bind="row.href">-->*/}
          {/*<!--${row.title}-->*/}
          {/*<!--</a>-->*/}
          {/*<!--*/}
          {/*</li>*/}
          {/*-->*/}
          {/*<!--*/}
          {/*</ul>*/}
          {/*-->*/}

          <ul className="nav navbar-nav navbar-right">
            {loadingSpinner}
          </ul>
        </div>
      </nav>
    );
  }
}
