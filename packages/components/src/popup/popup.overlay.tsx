import { CSSProperties, useContext } from 'react';
import { ViewProps } from '@tarojs/components/types/View';
import SharedOverlay from '../overlay';
import PopupContext from './popup.context';

export interface PopupOverlayProps extends ViewProps {
  style?: CSSProperties;
  visible?: boolean;
  duration?: number;
  closeable?: boolean;
}

const PopupOverlay = (props: PopupOverlayProps) => {
  const { visible: visibleProp = true, duration, ...restProps } = props;
  const {
    visible,
    duration: ctxDuration,
    closeable,
    onClose
  } = useContext(PopupContext);
  return (
    <SharedOverlay
      visible={visibleProp && visible}
      duration={duration ?? ctxDuration}
      closeable={closeable}
      onClose={onClose}
      {...restProps}
    />
  );
};

PopupOverlay.displayName = 'PopupOverlay';

export default PopupOverlay;
