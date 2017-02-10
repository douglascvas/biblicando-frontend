import * as React from 'react'
import {Link} from 'react-router'
import * as Helmet from 'react-helmet'
import * as config from '../config';

interface AppProps {
  children: Object
}

export default class AppLayout extends React.Component<AppProps, any> {
  public render() {
    return (
      <div className="views">
        <Helmet {...config} />

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}

