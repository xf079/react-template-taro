import { View, Text } from '@tarojs/components'
import './index.scss'

definePageConfig({
  navigationBarTitleText: '首页',
})

const Index = () => {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

export default Index
