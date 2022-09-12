const path = require('path')

module.exports = {
  extensions: ['.ts', '.tsx', '.scss'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
