import * as React from 'react';

export class ErrorReporter extends React.Component<any,any> {
  private sourceMapper: any;

  public componentWillMount() {
    const error = this.props.error;
    this.sourceMapper = require('sourcemapped-stacktrace');
    this.setState({message: 'Processing error, please wait a moment...'});
    console.log(error);
    this.sourceMapper.mapStackTrace(error.stack, (mappedStack) => {
      this.setState({message: error.message, stack: mappedStack})
    });
  }

  public render() {
    let message = this.state.message;
    let stack = this.state.stack || [];
    const stackElements = stack.map((line, index) =><p key={'p-'+index}>{line}</p>);
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
    const messageStyle = {
      fontWeight: 1,
      fontSize: '2rem'
    };

    return (
      <div style={style}>
        <span style={messageStyle}>{message}</span>
        {stackElements}
      </div>
    )
  }
}
