import {
  CSSProperties,
  forwardRef,
  memo,
  ReactNode,
  useImperativeHandle,
  useMemo
} from 'react';
import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import { ViewProps } from '@tarojs/components/types/View';
import classNames from 'classnames';
import { isNumber } from 'lodash-es';
import { useNamespace, useUncontrolled } from '@linkio/hooks';
import Transition from '../transition';

import './overlay.scss';

export enum OpacityRecord {
  default = 0.55,
  thin = 0.35,
  thick = 0.75
}

export enum ColorRecord {
  black = '0,0,0',
  white = '255,255,255'
}

export interface OverlayProps extends ViewProps {
  visible?: boolean;
  defaultVisible?: boolean;
  style?: CSSProperties;
  color?: keyof typeof ColorRecord | string;
  opacity?: keyof typeof OpacityRecord | number;
  closeable?: boolean;
  duration?: number;
  children?: ReactNode;
  onClose?(opened: boolean): void;
}

export interface OverlayRefType {
  handleShow: () => void;
  handleHide: () => void;
}

const Overlay = memo<OverlayProps>(
  forwardRef<OverlayRefType, OverlayProps>((props, ref) => {
    const {
      className,
      style: styleProp,
      defaultVisible,
      visible: visibleProp,
      closeable = false,
      opacity = 'default',
      color = 'black',
      duration,
      children,
      onClick,
      onClose,
      ...restProps
    } = props;

    const ns = useNamespace('overlay');

    const [visible = false, setVisible] = useUncontrolled<boolean>({
      value: visibleProp,
      defaultValue: defaultVisible,
      finalValue: false
    });

    const background = useMemo(() => {
      const _opacity = OpacityRecord[opacity] ?? opacity;
      const _rgb = ColorRecord[color];
      return _rgb ? `rgba(${_rgb}, ${_opacity})` : color;
    }, [color, opacity]);

    const durationStyle = useMemo(
      () => (isNumber(duration) ? { animationDuration: `${duration}ms` } : {}),
      [duration]
    );

    useImperativeHandle(ref, () => ({
      handleShow: () => {
        setVisible(true);
      },
      handleHide: () => {
        setVisible(false);
        onClose?.(false);
      }
    }));

    const handleClick = (event: ITouchEvent) => {
      onClick?.(event);
      if (closeable) {
        setVisible(false);
        onClose?.(false);
      }
    };

    return (
      <Transition
        in={visible}
        appear
        timeout={duration}
        mountOnEnter
        name='fade'
      >
        <View
          className={classNames(ns.b(), ns.is('open', visible), className)}
          style={{
            backgroundColor: background,
            ...durationStyle,
            ...styleProp
          }}
          catchMove
          children={children}
          onClick={handleClick}
          {...restProps}
        />
      </Transition>
    );
  })
);

Overlay.displayName = 'Overlay';

export default Overlay;
