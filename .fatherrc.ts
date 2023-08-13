import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm'
  },
  cjs: {
    output: 'dist/cjs'
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'react-icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false
      },
      'react-icons'
    ]
  ],
  plugins: ['father-plugin-dumi-theme']
});
