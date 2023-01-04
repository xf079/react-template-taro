import { createContext } from 'react';
import { PopupPlacement } from './shared';

interface PopupContextProps {
  visible?: boolean;
  duration?: number;
  placement?: PopupPlacement;

  onClose?(opened: boolean): void;
}

const PopupContext = createContext<PopupContextProps>({});

export default PopupContext;
