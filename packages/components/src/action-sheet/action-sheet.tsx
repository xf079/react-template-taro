import { memo, ReactNode } from 'react';
import { View } from '@tarojs/components';
import { useNamespace } from '@linkio/hooks';
import Popup, { PopupProps } from '../popup';
import './action-sheet.scss';
import classNames from 'classnames';

export interface ActionItem {
  key: string | number;
  text: ReactNode;
  disabled?: boolean;
  description?: ReactNode;
  danger?: boolean;
  bold?: boolean;
  onClick?: () => void;
}

export interface ActionSheetProps extends PopupProps {
  actions: ActionItem[];
  extra?: ReactNode;
  cancelText?: ReactNode;
  onAction?: (action: ActionItem, index: number) => void;
  onCancelAction?: () => void;
  closeOnAction?: boolean;
}

const ActionSheet = memo<ActionSheetProps>((props) => {
  const {
    actions = [],
    extra,
    cancelText = '',
    onAction,
    onCancelAction,
    closeOnAction = false,
    ...resetProps
  } = props;

  const ns = useNamespace('action-sheet');
  const handleActionItem = (action, index) => {
    onAction?.(action, index);
    if (closeOnAction) {
      resetProps.onClose?.(false);
    }
  };

  const handleCancelAction = () => {
    onCancelAction?.();
    if (closeOnAction) {
      resetProps.onClose?.(false);
    }
  };

  return (
    <Popup {...resetProps} placement='bottom'>
      <View className={ns.b()}>
        {extra && <View className={ns.e('extra')}>{extra}</View>}
        <View className={ns.e('list')}>
          {actions.map((action, index) => (
            <View
              key={action.key}
              className={classNames(
                ns.e('item'),
                ns.is('danger', action.danger),
                ns.is('disabled', action.disabled),
                ns.is('bold', action.bold)
              )}
              onClick={() => handleActionItem(action, index)}
            >
              <View key={action.key} className={ns.em('item', 'name')}>
                {action.text}
              </View>

              {action.description && (
                <View key={action.key} className={ns.em('item', 'description')}>
                  {action.description}
                </View>
              )}
            </View>
          ))}
        </View>
        {cancelText && (
          <View className={ns.e('cancel')} onClick={handleCancelAction}>
            <View className={ns.e('item')}>
              <View className={ns.em('item', 'name')}>{cancelText}</View>
            </View>
          </View>
        )}
      </View>
    </Popup>
  );
});

export default ActionSheet;
