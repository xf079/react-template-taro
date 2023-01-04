import { CSSProperties, memo, ReactNode, useMemo } from 'react';
import { ViewProps } from '@tarojs/components/types/View';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { isNumber, isUndefined } from 'lodash-es';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import Transition from '@/_core/components/transition';
import useUncontrolled from '@/hooks/_core/useUncontrolled';
import { prefixClassname } from '@/_core/components/utils';
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
            prefixClassname('popup'),
            {
              [prefixClassname('popup--rounded')]: rounded,
              [prefixClassname('popup--center')]: isUndefined(placement),
              [prefixClassname('popup--top')]: placement === 'top',
              [prefixClassname('popup--right')]: placement === 'right',
              [prefixClassname('popup--bottom')]: placement === 'bottom',
              [prefixClassname('popup--left')]: placement === 'left'
            },
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
