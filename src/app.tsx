import React, { ReactNode } from 'react'
import '@/app.scss'
import { Provider } from 'react-redux'
import store from '@/stores'

interface IAppProps {
  children: ReactNode
}

class App extends React.PureComponent<IAppProps> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
