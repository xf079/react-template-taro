import { View, Text } from '@tarojs/components';
import { useAppDispatch, useAppSelector } from '@/stores';
import {
  getGlobalData,
  updateEnterFirstMiniProgram
} from '@/stores/modules/global';
import './index.scss';

definePageConfig({
  navigationBarTitleText: '首页'
});

const Index = () => {
  const { appName, enterFirstMiniProgram } = useAppSelector(
    (state) => state.global
  );
  const dispatch = useAppDispatch();

  const handleUpdateAppName = async () => {
    dispatch(getGlobalData(1));
  };
  const handleUpdateEnter = () => {
    dispatch(updateEnterFirstMiniProgram(true));
  };
  return (
    <View className='index'>
      <Text onClick={handleUpdateAppName}>Hello world! {appName}</Text>
      <View onClick={handleUpdateEnter}>
        <Text>小程序是否第一次进入{enterFirstMiniProgram ? 1 : 0}</Text>
      </View>
    </View>
  );
};

export default Index;
