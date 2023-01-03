import { Button, Text, View } from '@tarojs/components';
import { useAppDispatch, useAppSelector } from '@/stores';
import {
  getGlobalData,
  updateEnterFirstMiniProgram
} from '@/stores/modules/global';
import './index.scss';
import Modal from '@/components/modal/modal';
import useInterval from '@/hooks/_core/useInterval';
import useUpdate from '@/hooks/_core/useUpdate';
import Overlay from '@/_core/components/overlay';
import { useState } from 'react';

definePageConfig({
  navigationBarTitleText: '首页'
});

const Index = () => {
  const { appName, enterFirstMiniProgram } = useAppSelector(
    (state) => state.global
  );
  const [run, clear] = useInterval(
    () => {
      console.log('定时器里面');
    },
    {
      delay: 2000,
      immediate: true
    }
  );
  const [open, setOpen] = useState(false);
  const update = useUpdate();
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
      <Modal title={''} />
      <Button onClick={() => clear()}>清除定时器</Button>
      <Button onClick={() => run()}>开始定时器</Button>
      <Button onClick={() => update()}>更新</Button>
      <Button onClick={() => setOpen(true)}>打开遮罩层</Button>
      <View
        id='test'
        ref={(ref) => {
          console.log(ref);
        }}
      >
        123
      </View>
      <Overlay
        open={open}
        closeable
        duration={1000}
        onClose={() => setOpen(false)}
      >
        123
      </Overlay>
    </View>
  );
};

export default Index;
