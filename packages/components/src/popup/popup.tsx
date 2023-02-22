import { CSSProperties, memo, ReactNode, useMemo } from 'react';
import { ViewProps } from '@tarojs/components/types/View';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { isNumber, isUndefined } from 'lodash-es';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import Transition from '../transition';
import { useUncontrolled, useNamespace } from '@linkio/hooks';
import { PopupPlacement, toTransactionName, usePopupChildren } from './shared';
import PopupContext from './popup.context';
import PopupOverlay from './popup.overlay';

import './popup.scss';

export interface PopupProps extends ViewProps {
  style?: CSSProperties;
  defaultVisible?: boolean;
  visible?: boolean;
  placement?: PopupPlacement;
  rounded?: boolean;
  closeable?: boolean;
  children?: ReactNode;

  duration?: number;
  mountOnEnter?: boolean;
  transaction?: string;
  transactionTimeout?:
    | number
    | { appear?: number; enter?: number; exit?: number };
  transitionAppear?: boolean;
  onClose?(opened: boolean): void;
  onTransitionEnter?: EnterHandler<undefined>;
  onTransitionEntered?: EnterHandler<HTMLElement>;
  onTransitionExited?: ExitHandler<HTMLElement>;
}

const Popup = memo<PopupProps>((props) => {
  const {
    className,
    style: styleProp,
    defaultVisible,
    visible: visibleProp,
    placement,
    rounded = false,
    closeable,
    children,
    duration,
    transaction,
    transactionTimeout,
    transitionAppear = true,
    mountOnEnter = true,
    onClose,
    onTransitionEnter,
    onTransitionEntered,
    onTransitionExited,
    ...restProps
  } = props;
  const ns = useNamespace('popup');
  const [visible] = useUncontrolled({
    defaultValue: defaultVisible,
    value: visibleProp
  });

  const transactionName = transaction ?? toTransactionName(placement);
  const { overlay = <PopupOverlay />, content } = usePopupChildren(children);
  const durationStyle = useMemo(
    () =>
      isNumber(duration)
        ? { animationDuration: `${duration as number}ms` }
        : {},
    [duration]
  );

  return (
    <PopupContext.Provider
      value={{
        visible,
        closeable,
        duration,
        placement,
        onClose
      }}
    >
      {overlay}
      <Transition
        in={visible}
        name={transactionName}
        appear={transitionAppear}
        timeout={transactionTimeout}
        mountOnEnter={mountOnEnter}
        onEnter={onTransitionEnter}
        onEntered={onTransitionEntered}
        onExited={onTransitionExited}
      >
        <View
          className={classNames(
            ns.b(),
            ns.is('rounded', rounded),
            ns.is('center', isUndefined(placement)),
            ns.is('top', placement === 'top'),
            ns.is('right', placement === 'right'),
            ns.is('bottom', placement === 'bottom'),
            ns.is('left', placement === 'left'),
            className
          )}
          style={{
            ...durationStyle,
            ...styleProp
          }}
          {...restProps}
        >
          {content}
        </View>
      </Transition>
    </PopupContext.Provider>
  );
});

export default Popup;
