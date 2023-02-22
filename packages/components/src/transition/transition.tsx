import { FC, useMemo, useState, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import type {
  EnterHandler,
  ExitHandler
} from 'react-transition-group/Transition';
import { getElementStyle } from '@linkio/utils';
import { useNamespace } from '@linkio/hooks';

import './transition.scss';

export enum TransitionName {
  Fade = 'fade',
  SlideUp = 'slide-up',
  SlideDown = 'slide-down',
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right'
}

const TRANSITION_PRESETS: string[] = [
  TransitionName.Fade,
  TransitionName.SlideUp,
  TransitionName.SlideDown,
  TransitionName.SlideLeft,
  TransitionName.SlideRight
];

function isTransitionPreset(name?: string) {
  return name && TRANSITION_PRESETS.includes(name);
}

interface TransitionProps {
  name?: TransitionName | string;
  in?: boolean;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
  children?: ReactNode;
  onEnter?: EnterHandler<undefined>;
  onEntering?: EnterHandler<HTMLElement>;
  onEntered?: EnterHandler<HTMLElement>;
  onExit?: ExitHandler<HTMLElement>;
  onExiting?: ExitHandler<HTMLElement>;
  onExited?: ExitHandler<undefined>;
}

const Transition: FC<TransitionProps> = (props) => {
  const {
    name,
    in: inProp = false,
    appear = false,
    mountOnEnter = false,
    unmountOnExit,
    timeout = 300,
    children: childrenProp,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  } = props;
  const ns = useNamespace('transition');
  const children = useMemo(() => childrenProp, [childrenProp]);
  const childrenStyle = getElementStyle(children);
  const transactionName = isTransitionPreset(name) ? ns.m(name) : name;
  const [enter, setEnter] = useState(false);
  const [exited, setExited] = useState(false);

  return (
    <CSSTransition
      in={inProp}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
      appear={appear}
      classNames={transactionName}
      style={{
        ...childrenStyle,
        display: enter && !exited ? 'block' : 'none'
      }}
      onEnter={(node, isAppearing) => {
        setEnter(true);
        setExited(false);
        onEnter?.(node, isAppearing);
      }}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={(node) => {
        setEnter(false);
        setExited(true);
        onExited?.(node);
      }}
    >
      {children}
    </CSSTransition>
  );
};
Transition.displayName = 'Transition';

export default Transition;
