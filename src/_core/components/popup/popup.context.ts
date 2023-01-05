import { createContext } from 'react';
import { PopupPlacement } from './shared';

interface PopupContextProps {
  visible?: boolean;
  duration?: number;
  placement?: PopupPlacement;
  closeable?: boolean;
  onClose?(opened: boolean): void;
}

const PopupContext = createContext<PopupContextProps>({});

export default PopupContext;
