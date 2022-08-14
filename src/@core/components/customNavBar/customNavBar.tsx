/**
  * @name customNavBar
  * @description 公用顶部导航栏
  * @constructor
  */
import { FC, useEffect, ReactNode } from "react";
import { View } from  '@tarojs/components'

/**
 * CustomNavBar Props
 */
export interface ICustomNavBarProps{
  children?: ReactNode
}


const CustomNavBar:FC<ICustomNavBarProps> = (props)=>{

  useEffect(()=>{
    console.log('CustomNavBar component render！');
  },[])

  return (
    <View className='custom-nav-bar'>
      hello Component!
    </View>
  )
}

export default CustomNavBar;
