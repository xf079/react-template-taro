import { defineConfig } from 'dumi';

export default defineConfig({
  resolve: {
    docDirs: ['./docs', '../packages']
  },
  themeConfig: {
    name: 'Linkio',
    // 配置 demo 预览器的设备宽度，默认为 375px
    deviceWidth: 375
  }
});
