import * as React from 'react';
import Layout from './Layout';
import Counter from './Counter';
// import AppActions from '../../actions/AppActions';
// import ItemsStore from '../../stores/ItemsStore';
// import Body from '../body/body';
// import Footer from '../footer/footer';

function getAppState() {
  return {};
}

export default class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange = () => {
    // this.setState(getAppState());
  }

  render() {
    return (
      <Layout>
        <Counter />
      </Layout>
    );
  }
}
