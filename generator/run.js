
const componentGenerator = require('./component/index')

function generator(plop){
  plop.setWelcomeMessage(' 👽 欢迎使用Taro 快捷模版~ 请选择需要创建的模版：');

  plop.setGenerator('component',componentGenerator)
  plop.setGenerator('page',componentGenerator)
  plop.setGenerator('store',componentGenerator)
  plop.setGenerator('service',componentGenerator)
}

module.exports = generator
