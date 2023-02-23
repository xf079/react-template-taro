/**
 * title: Basic usage
 * desc: Toggle boolean, default value can be set optionally.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 切换 boolean，可以接收默认值。
 * domeUrl:http://172.168.20.139:10086/#/pages/index/index
 */
import * as React from 'react';
import { useUpdate } from '@linkio/hooks';

export default () => {
  const update = useUpdate();

  return (
    <div>
      <p></p>
      <p>
        <button type='button' onClick={update}>
          Toggle
        </button>
      </p>
    </div>
  );
};
