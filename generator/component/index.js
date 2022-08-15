function generatorComp(){
  return {
    description:'组件模版',
    prompts:[

      {
        type: 'input', // 问题类型 此处为输入
        name: 'hasCoreComponent', // actions 和 hbs 模板文件中可使用该变量
        message: '是否创建核心组件(Y/N)？', // 问题
        default: 'N', // 问题的默认答案
      },
      {
        type: 'input', // 问题类型 此处为输入
        name: 'FILE_NAME', // actions 和 hbs 模板文件中可使用该变量
        message: '请输入组件名称', // 问题
        default: 'ComponentName', // 问题的默认答案
      },
      {
        type: 'input', // 问题类型 此处为输入
        name: 'FILE_DESC', // actions 和 hbs 模板文件中可使用该变量
        message: '请输入组件描述', // 问题
        default: 'Component Description', // 问题的默认答案
      },
    ],
    // 操作行为
    actions: function (data) {
      let actions = []
      // 区分是否分包
      if (data.hasCoreComponent.toUpperCase() === 'Y') {
        actions = actions.concat([
          {
            type: 'add', // 操作类型，这里是添加文件
            path: '../src/_core/components/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}.tsx',
            templateFile: './component/component.tsx.hbs', // 模板文件的路径
          },
          {
            type: 'add', // 操作类型，这里是添加文件
            path:
              '../src/_core/components/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}.scss', // 添加的文件的路径
            templateFile: './component/component.scss.hbs', // 模板文件的路径
          },
        ])
      } else {
        actions = actions.concat([
          {
            type: 'add', // 操作类型，这里是添加文件
            path:
              '../src/components/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}.tsx', // 添加的文件的路径
            templateFile: './component/component.tsx.hbs', // 模板文件的路径
          },
          {
            type: 'add', // 操作类型，这里是添加文件
            path:
              '../src/components/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}.scss', // 添加的文件的路径
            templateFile: './component/component.scss.hbs', // 模板文件的路径
          },
        ])
      }
      return actions
    }
  }
}

module.exports = generatorComp();
