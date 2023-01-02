/**
 * @name {{name}}
 * @constructor
 */
import { FC, ReactNode } from 'react';
import { View } from '@tarojs/components';

export interface IComponentProps {
  children?: ReactNode;
}

const Component: FC<IComponentProps> = () => {
  return <View className=''>hello Component!</View>;
};

export default Component;
