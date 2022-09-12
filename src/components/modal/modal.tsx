/**
 * @name Modal
 * @description 常用弹出层
 * @constructor
 */
import { FC, useEffect, ReactNode } from 'react'
import { View } from '@tarojs/components'

/**
 * Modal Props
 */
export interface IModalProps {
  children?: ReactNode
}

const Modal: FC<IModalProps> = (props) => {
  useEffect(() => {
    console.log('Modal component render！')
  }, [])

  return <View className='modal'>hello Component!</View>
}

export default Modal
