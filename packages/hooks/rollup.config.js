import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

const entry = 'src/index.ts';

const config = [
  {
    // 入口
    input: entry,
    // 打包信息
    output: [{ filename: 'index.esm.js', dir: 'dist/es/', format: 'esm' }],
    // 插件配置
    plugins: [
      // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
      resolve(),
      // 支持commonjs，包括第三方引入使用到commonjs语法
      commonjs(),
      // typescript支持
      typescript()
    ]
  },
  {
    // 生成 .d.ts 类型声明文件
    input: './src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];

export default config;
