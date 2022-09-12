import {
  FC,
  isValidElement,
  ReactElement,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  EnterHandler,
  ExitHandler,
} from 'react-transition-group/Transition'
import { prefixClassname } from '../utils/prefix'

export enum TransitionName {
  Fade = 'fade',
  SlideUp = 'slide-up',
  SlideDown = 'slide-down',
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right',
}

const TRANSITION_PRESETS: string[] = [
  TransitionName.Fade,
  TransitionName.SlideUp,
  TransitionName.SlideDown,
  TransitionName.SlideLeft,
  TransitionName.SlideRight,
]

function isTransitionPreset(name?: string) {
  return name && TRANSITION_PRESETS.includes(name)
}

function useElementStyle(children?: ReactNode) {
  return useMemo(() => {
    if (!isValidElement(children)) {
      return {}
    }
    const element = children as ReactElement
    const { style } = element.props
    return style ?? {}
  }, [children])
}

interface TransitionProps {
  name?: TransitionName | string
  in?: boolean
  appear?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  timeout?: number | { appear?: number; enter?: number; exit?: number }
  children?: ReactNode
  onEnter?: EnterHandler<HTMLElement>
  onEntering?: EnterHandler<HTMLElement>
  onEntered?: EnterHandler<HTMLElement>
  onExit?: ExitHandler<HTMLElement>
  onExiting?: ExitHandler<HTMLElement>
  onExited?: ExitHandler<HTMLElement>
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
    onExited,
  } = props
  const children = useMemo(() => childrenProp, [childrenProp])
  const childrenStyle = useElementStyle(children)
  const transactionName = isTransitionPreset(name)
    ? prefixClassname(`transition-${name}`)
    : name
  const [enter, setEnter] = useState(false)
  const [exited, setExited] = useState(false)

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
        display: enter && !exited ? '' : 'none',
      }}
      onEnter={(node, isAppearing) => {
        setEnter(true)
        setExited(false)
        // @ts-ignore
        onEnter?.(node, isAppearing)
      }}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={(node) => {
        setEnter(false)
        setExited(true)
        // @ts-ignore
        onExited?.(node)
      }}
    >
      {children}
    </CSSTransition>
  )
}
export default Transition