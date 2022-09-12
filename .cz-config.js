const { updateKey } = require('./generator/utils')

const types = {
  feat: '新功能',
  fix: '功能修复',
  docs: '文档变更',
  style: '代码格式(不影响代码运行的变动)',
  refactor: '重构(既不是增加feature)，也不是修复bug',
  perf: '性能优化',
  test: '增加测试',
  chore: '构建过程或辅助功能的变动',
  revert: '回退',
  build: '打包',
}

function createCZConfig() {
  const keys = Object.keys(types)
  const maxKeyLen = Math.max(...keys.map((_key) => _key.length))

  const choreTypes = []

  keys.forEach((_key) => {
    const _keyName = updateKey(_key, maxKeyLen)
    choreTypes.push({
      value: _keyName,
      name: `${_keyName}: ${types[_key]}`,
    })
  })
  return {
    //可选类型
    types: choreTypes,
    scopes: [
      { name: 'component' },
      { name: 'layout' },
      { name: 'pages' },
      { name: 'utils' },
    ],
    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    // override the messages, defaults are as follows
    messages: {
      type: '请选择提交类型',
      customScope: '请输入修改范围(可选)',
      subject: '请简要描述提交(必填)',
      body: '请输入详细描述(可选)',
      footer: '请输入要关闭的issue(可选)',
      confirmCommit: '确认以上信息提交?(y/n)',
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestion: ['body', 'footer'],
    // limit subject length
    subjectLimit: 100,
  }
}

module.exports = createCZConfig()
