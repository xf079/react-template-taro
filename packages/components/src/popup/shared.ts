import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo
} from 'react';
import { isElementOf } from '@linkio/utils';
import { TransitionName } from '../transition';

import Overlay from '../overlay';

export type PopupPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface PopupChildren {
  overlay?: ReactNode;
  content: ReactNode[];
}

export const toTransactionName = (placement?: PopupPlacement) => {
  if (placement === 'top') {
    return TransitionName.SlideDown;
  }

  if (placement === 'bottom') {
    return TransitionName.SlideUp;
  }

  if (placement === 'right') {
    return TransitionName.SlideRight;
  }

  if (placement === 'left') {
    return TransitionName.SlideLeft;
  }

  return TransitionName.Fade;
};

export const usePopupChildren = (children?: ReactNode): PopupChildren => {
  return useMemo(() => {
    const __children__: PopupChildren = {
      overlay: undefined,
      content: []
    };
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const element = child as ReactElement;
        if (isElementOf(element, Overlay)) {
          __children__.overlay = element;
        } else {
          __children__.content.push(child);
        }
      } else {
        __children__.content.push(child);
      }
    });
    return __children__;
  }, [children]);
};
