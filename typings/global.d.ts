/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

type TARO_ENV =
  | 'weapp'
  | 'swan'
  | 'alipay'
  | 'h5'
  | 'rn'
  | 'tt'
  | 'quickapp'
  | 'qq'
  | 'jd'
  | 'xhs';

declare const NODE_ENV: string;
declare const TARO_ENV: TARO_ENV;
declare const DESIGN_WIDTH: number;
