import { CSSProperties, memo, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import { ViewProps } from '@tarojs/components/types/View';
import classNames from 'classnames';
import { isNumber } from '@/utils';
import useUncontrolled from '@/hooks/_core/useUncontrolled';
import { prefixClassname } from '../utils';
import Transition from '../transition';

import './overlay.scss';

interface OverlayProps extends ViewProps {
  style?: CSSProperties;
  defaultOpen?: boolean;
  open?: boolean;
  closeable?: boolean;
  duration?: number;
  children?: ReactNode;
  onClose?(opened: boolean): void;
}

const Overlay = memo<OverlayProps>((props) => {
  const {
    className,
    style: styleProp,
    defaultOpen,
    open: openProp,
    closeable = false,
    duration,
    children,
    onClick,
    onClose,
    ...restProps
  } = props;

  const [open = false, setOpen] = useUncontrolled<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    finalValue: false
  });

  const durationStyle = useMemo(
    () =>
      isNumber(duration)
        ? { animationDuration: `${duration as number}ms` }
        : {},
    [duration]
  );

  function handleClick(event: ITouchEvent) {
    onClick?.(event);
    if (closeable) {
      setOpen(false);
      onClose?.(false);
    }
  }

  return (
    <Transition in={open} appear timeout={duration} mountOnEnter name='fade'>
      <View
        className={classNames(
          prefixClassname('overlay'),
          {
            [prefixClassname('overlay--open')]: open
          },
          className
        )}
        style={{
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
});

Overlay.displayName = 'Overlay';

export default Overlay;
