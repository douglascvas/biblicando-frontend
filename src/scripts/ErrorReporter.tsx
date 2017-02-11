import * as React from 'react';

export class ErrorReporter extends React.Component<any,any> {
  private sourceMapper: any;

  public componentWillMount() {
    this.sourceMapper = require('sourcemapped-stacktrace');
    this.setState({error: 'loading...'});
    console.log(this.props.error);
    this.sourceMapper.mapStackTrace(this.props.error.stack, (mappedStack) => this.setState({error: mappedStack}));
  }

  public render() {
    let error = this.state.error;
    if (!(error instanceof Array)) {
      error = [error];
    }
    const parts = error.map((line, index) =><p key={'p-'+index}>{line}</p>);
    console.log(this.props.error);
    const style = {
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      position: 'fixed',
      padding: '10px',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      width: '100%',
      background: 'red',
      color: 'white',
      fontSize: '16px',
      lineHeight: 1.2,
      overflow: 'scroll'
    };

    return (
      <div style={style}>
        {parts}
      </div>
    )
  }
}
