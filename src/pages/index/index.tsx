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
import Overlay, { OverlayRefType } from '@/_core/components/overlay';
import { useRef, useState } from 'react';
import Popup from '@/_core/components/popup';
import Loading from '@/_core/components/loading/loading';

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
      immediate: false
    }
  );
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<OverlayRefType>(null);
  const update = useUpdate();
  const dispatch = useAppDispatch();

  const handleUpdateAppName = async () => {
    dispatch(getGlobalData(1));
  };
  const handleUpdateEnter = () => {
    dispatch(updateEnterFirstMiniProgram(true));
  };

  const handleOpenOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.handleShow();
    }
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
      <Button onClick={handleOpenOverlay}>打开遮罩层</Button>
      <Button onClick={() => setVisible(true)}>打开POPUP</Button>
      <View id='test'>123</View>
      <Overlay
        ref={overlayRef}
        color='black'
        opacity='thick'
        closeable
        duration={400}
      >
        123
      </Overlay>
      <Popup
        visible={visible}
        placement='bottom'
        rounded
        onClose={() => setVisible(false)}
      >
        <View>123</View>
      </Popup>
      <Loading direction='horizontal'>加载中。。。</Loading>
    </View>
  );
};

export default Index;
