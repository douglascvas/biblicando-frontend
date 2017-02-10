import * as React from 'react';

export default class Layout extends React.Component<any,any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, worlds!</h1>
        {this.props.children}
      </div>
    )
  }
}

