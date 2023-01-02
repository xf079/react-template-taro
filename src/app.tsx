import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/stores';

import '@/app.scss';

interface IAppProps {
  children: ReactNode;
}

class App extends React.PureComponent<IAppProps> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.props.children} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
