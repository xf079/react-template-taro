/**
 * @name Modal
 * @description 常用弹出层
 * @constructor
 */
import {
  useEffect,
  ReactNode,
  memo,
  forwardRef,
  useImperativeHandle
} from 'react';
import { View } from '@tarojs/components';

/**
 *
 * Modal Props
 */
export interface IModalProps {
  title: string;
  children?: ReactNode;
}

export interface IModalRef {
  setVisible: (status: boolean) => void;
}
const Modal = memo(
  forwardRef<IModalRef, IModalProps>((props, ref) => {
    const { title } = props;
    useImperativeHandle(ref, () => ({
      setVisible(status) {
        console.log(status);
      }
    }));
    useEffect(() => {
      console.log('Modal component render！');
    }, []);

    return <View className='modal'>{title}hello Component!</View>;
  })
);

export default Modal;
