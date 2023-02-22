import { memo, ReactNode, useMemo } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { range } from 'lodash-es';
import { useNamespace } from '@linkio/hooks';

import './loading.scss';

export interface LoadingProps {
  color?: string;
  size?: number | string;
  type?: 'spinner' | 'circular';
  direction?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

const SpinIcon = ({ color }: LoadingProps) => {
  const ns = useNamespace('loading');
  return (
    <>
      {range(0, 8).map((key) => (
        <View
          key={key}
          style={{ color: color }}
          className={ns.em('spinner', 'item')}
        />
      ))}
    </>
  );
};

const SpinnerLoading = ({ size, color }: LoadingProps) => {
  const ns = useNamespace('loading');
  const baseStyle = useMemo(
    () => ({
      width: size,
      height: size
    }),
    [size]
  );
  return (
    <View className={ns.e('spinner')} style={baseStyle}>
      <SpinIcon color={color} />
    </View>
  );
};

const CircularLoading = ({ color, size }: LoadingProps) => {
  const ns = useNamespace('loading');
  const baseStyle = useMemo(
    () => ({
      borderColor: color,
      width: size,
      height: size
    }),
    [color, size]
  );
  return <View className={ns.e('circular')} style={baseStyle} />;
};

const Loading = memo<LoadingProps>((props) => {
  const {
    color,
    size,
    type = 'circular',
    direction = 'vertical',
    children
  } = props;
  const ns = useNamespace('loading');

  return (
    <View className={classNames(ns.b(), ns.m(direction))}>
      {type === 'circular' && <CircularLoading size={size} color={color} />}
      {type === 'spinner' && <SpinnerLoading size={size} color={color} />}
      {children && (
        <View className={ns.m('text')} style={{ color }}>
          {children}
        </View>
      )}
    </View>
  );
});

export default Loading;
