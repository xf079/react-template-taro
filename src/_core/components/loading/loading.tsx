import { memo, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { range } from 'lodash-es';
import { prefixClassname } from '@/_core/components/utils';

import './loading.scss';

export interface LoadingProps {
  color?: string;
  size?: number | string;
  type?: 'spinner' | 'circular';
  direction?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

const SpinIcon = ({ color }: LoadingProps) => {
  return (
    <>
      {range(0, 8).map((key) => (
        <View
          key={key}
          style={{ color: color }}
          className={prefixClassname('loading__spinner__item')}
        />
      ))}
    </>
  );
};

const SpinnerLoading = ({ size, color }: LoadingProps) => {
  const baseStyle = useMemo(
    () => ({
      width: size,
      height: size
    }),
    [size]
  );
  return (
    <View className={prefixClassname('loading__spinner')} style={baseStyle}>
      <SpinIcon color={color} />
    </View>
  );
};

const CircularLoading = ({ color, size }: LoadingProps) => {
  const baseStyle = useMemo(
    () => ({
      borderColor: color,
      width: size,
      height: size
    }),
    [color, size]
  );
  return (
    <View className={prefixClassname('loading__circular')} style={baseStyle} />
  );
};

const Loading = memo<LoadingProps>((props) => {
  const {
    color,
    size,
    type = 'circular',
    direction = 'vertical',
    children
  } = props;

  return (
    <View
      className={classNames(
        prefixClassname('loading'),
        prefixClassname(`loading__${direction}`)
      )}
    >
      {type === 'circular' && <CircularLoading size={size} color={color} />}
      {type === 'spinner' && <SpinnerLoading size={size} color={color} />}
      {children && (
        <View className={prefixClassname('loading__text')} style={{ color }}>
          {children}
        </View>
      )}
    </View>
  );
});

export default Loading;
