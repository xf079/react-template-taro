import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import Popup, { PopupProps } from '@/_core/components/popup';
import { prefixClassname } from '@/_core/components/utils';
import './action-sheet.scss';

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

const classPrefix = 'action-sheet';

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
      <View className={classNames(prefixClassname(classPrefix))}>
        {extra && (
          <View
            className={classNames(prefixClassname(`${classPrefix}__extra`))}
          >
            {extra}
          </View>
        )}
        <View className={classNames(prefixClassname(`${classPrefix}__list`))}>
          {actions.map((action, index) => (
            <View
              key={action.key}
              className={classNames(prefixClassname(`${classPrefix}__item`), {
                [prefixClassname(`${classPrefix}__item-danger`)]: action.danger,
                [prefixClassname(`${classPrefix}__item-disabled`)]:
                  action.disabled,
                [prefixClassname(`${classPrefix}__item-bold`)]: action.bold
              })}
              onClick={() => handleActionItem(action, index)}
            >
              <View
                key={action.key}
                className={classNames(
                  prefixClassname(`${classPrefix}__item__name`)
                )}
              >
                {action.text}
              </View>

              {action.description && (
                <View
                  key={action.key}
                  className={classNames(
                    prefixClassname(`${classPrefix}__item__description`)
                  )}
                >
                  {action.description}
                </View>
              )}
            </View>
          ))}
        </View>
        {cancelText && (
          <View
            className={classNames(prefixClassname(`${classPrefix}__cancel`))}
            onClick={handleCancelAction}
          >
            <View
              className={classNames(prefixClassname(`${classPrefix}__item`))}
            >
              <View
                className={classNames(
                  prefixClassname(`${classPrefix}__item__name`)
                )}
              >
                {cancelText}
              </View>
            </View>
          </View>
        )}
      </View>
    </Popup>
  );
});

export default ActionSheet;
