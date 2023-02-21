import PopupComponent, { PopupProps } from './popup';
import { ForwardRefExoticComponent } from 'react';
import PopupOverlay from './popup.overlay';

export type { PopupProps };
export type { PopupPlacement } from './shared';
export type { PopupOverlayProps } from './popup.overlay';

interface PopupInterface extends ForwardRefExoticComponent<PopupProps> {
  (props: PopupProps): JSX.Element;
  Overlay: typeof PopupOverlay;
}

const Popup = PopupComponent as PopupInterface;

Popup.Overlay = PopupOverlay;

export default Popup;
