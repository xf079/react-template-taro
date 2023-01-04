import { isValidElement, memo, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { isNull, isUndefined } from 'lodash-es';
import { prefixClassname } from '@/_core/components/utils';

import './loading.scss';

export interface LoadingProps {
  color?: string;
  size?: number | string;
  type?: 'spinner' | 'circular';
  direction?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

const Loading = memo<LoadingProps>((props) => {
  const {
    color,
    size,
    type = 'circular',
    direction = 'vertical',
    children
  } = props;

  const baseStyle = useMemo(
    () => ({
      borderColor: color ?? undefined,
      width: size,
      height: size
    }),
    [color, size]
  );

  const textChildren = useMemo(() => {
    if (isValidElement(children)) {
      return children;
    }
    if (!isNull(children) || !isUndefined(children)) {
      return (
        <View className={prefixClassname('loading__text')}>{children}</View>
      );
    }
    return null;
  }, [children]);

  return (
    <View
      className={classNames(
        prefixClassname('loading'),
        prefixClassname(`loading__${direction}`)
      )}
    >
      <View className={prefixClassname(`loading__${type}`)} style={baseStyle} />
      {textChildren}
    </View>
  );
});

export default Loading;
