const componentGenerator = require('./component/index')

const generators = {
  component: componentGenerator,
  page: componentGenerator,
  store: componentGenerator,
  service: componentGenerator,
}

function updateKey(key, len) {
  const whitespaceLen = len - key.length
  return new Array(whitespaceLen).fill(' ').join('') + key
}

function generator(plop) {
  const keys = Object.keys(generators)
  const maxKeyLen = Math.max(...keys.map((_key) => _key.length))
  plop.setWelcomeMessage(' 👽 欢迎使用Taro 快捷模版~ 请选择需要创建的模版：')
  keys.forEach((_key) => {
    const _keyName = updateKey(_key, maxKeyLen)
    plop.setGenerator(_keyName, generators[_key])
  })
}

module.exports = generator
