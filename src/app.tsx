import React, { ReactNode } from 'react'
import '@/app.scss'

interface IAppProps {
  children: ReactNode
}

class App extends React.PureComponent<IAppProps> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return this.props.children
  }
}

export default App
